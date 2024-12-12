<script>
import User from "@/components/models/User.js";
import UserCollection from "@/firebase/UserCollection.js";
import Cluster from "@/components/models/Clust.js";
import Classification from "@/components/models/Classification.js";
import {ref} from "vue";
import HomeView from "@/views/HomeView.vue";

export default {
  name: "settings",
  data: function() {
    return {
      tab: ref('Personalization'),
      splitterModel: ref(20),
      previewImg: false,
      img: null,
    }},
  props:{
    authUser: {type: User, required: true},
  },
  components:{HomeView},
  methods:{
    previewUploadImg(){
      console.log('img', this.authUser.backgroundUrl);
      this.previewImg = URL.createObjectURL(this.authUser.backgroundUrl[0])
    },
    savePersonlizations(){
      UserCollection.updateUser(this.authUser)
    }

  }
}
</script>

<template>
  <q-page  v-if="authUser?.exists()">
    <div v-if="authUser?.id" class="q-pa-xl q-gutter-md">
      <q-splitter
          v-model="tab"
          class="q-pa-xl row justify-center  col-12 ">

        <template v-slot:before>
          <q-tabs
              v-model="tab"
              vertical

              class="full-height">

            <q-tab v-if="authUser.textColor" :style="{color: authUser.textColor}" name="Personalization" label="Personalization" />
            <q-tab  v-if="authUser.textColor" :style="{color: authUser.textColor}"  name="AccountDetails"  label="Account Details" />
<!--            <q-tab v-else style="color:#1976D2 " name="AccountDetails"  label="Account Details" />-->

            <q-tab  v-else style="color:#1976D2"  name="Personalization" label="Personalization" />
            <q-tab  v-else style="color:#1976D2 " name="AccountDetails"  label="Account Details" />


          </q-tabs>
        </template>

        <template v-slot:after>
          <q-tab-panels

              v-model="tab"
              animated
              swipeable
              vertical
              transition-prev="jump-up"
              transition-next="jump-up"
          >
            <q-tab-panel name="Personalization">
              <q-form
                  @submit="savePersonlizations"
              >
                <div style="color: black" class="text-h4 q-mb-md">Personalization</div>

                <div>
                  <q-card class="card q-ma-md">
                    <q-item :style="{background: authUser.siteColor}">
                      <q-item-section >
                        <q-item-label :style="{color: authUser.textColor}">Clusters</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-img v-if="previewImg" :src="previewImg">
                      <q-btn :style="{background: authUser?.buttonColor || blue , color:authUser?.buttonTextColor || white  }"  label="button"></q-btn>
                      <q-btn :style="{color: authUser?.buttonColor || white }" icon="flag" label="button"></q-btn>
                      <p class="justify-center" :style="{color:authUser.textColor}"> tester string </p>

                      <q-card v-if="authUser.cardColor"  :style="{background: authUser.cardColor}">
                        <q-item-section>
                          <q-item-label v-if="authUser.cardTextColor" :style="{color: authUser.cardTextColor}">card</q-item-label>
                          <q-item-label v-else style="color:black">card</q-item-label>
                        </q-item-section>
                      </q-card>

                      <q-card v-else style="background: white">
                        <q-item-section >
                          <q-item-label v-if="authUser.cardTextColor" :style="{color: authUser.cardTextColor}">card</q-item-label>
                          <q-item-label v-else style="color: black">card</q-item-label>
                        </q-item-section>

                      </q-card>
                    </q-img>
                    <q-img v-else-if="authUser?.backgroundUrl?.trim() !== ''" :src="authUser.backgroundUrl">
                      <q-btn :style="{background: authUser?.buttonColor || blue , color:authUser?.buttonTextColor || white  }"  label="button"></q-btn>
                      <q-btn :style="{color: authUser?.buttonColor || white }" icon="flag" label="button"></q-btn>
                      <p class="justify-center" :style="{color:authUser.textColor}"> tester string </p>

                      <q-card v-if="authUser.cardColor"  :style="{background: authUser.cardColor}">
                        <q-item-section>
                          <q-item-label v-if="authUser.cardTextColor" :style="{color: authUser.cardTextColor}">card</q-item-label>
                          <q-item-label v-else style="color:black">card</q-item-label>
                        </q-item-section>
                      </q-card>

                      <q-card v-else style="background: white">
                        <q-item-section >
                          <q-item-label v-if="authUser.cardTextColor" :style="{color: authUser.cardTextColor}">card</q-item-label>
                          <q-item-label v-else style="color: black">card</q-item-label>
                        </q-item-section>

                      </q-card>
                    </q-img>
                    <q-img v-else src="https://cdn.quasar.dev/img/parallax2.jpg">
                      <q-btn :style="{background: authUser?.buttonColor || blue , color:authUser?.buttonTextColor || white  }"  label="button"></q-btn>
                      <q-btn :style="{color: authUser?.buttonColor || white }" icon="flag" label="button"></q-btn>
                      <p class="justify-center" :style="{color:authUser.textColor}"> tester string </p>

                      <q-card v-if="authUser.cardColor"  :style="{background: authUser.cardColor}">
                        <q-item-section>
                          <q-item-label v-if="authUser.cardTextColor" :style="{color: authUser.cardTextColor}">card</q-item-label>
                          <q-item-label v-else style="color:black">card</q-item-label>
                        </q-item-section>
                      </q-card>

                      <q-card v-else style="background: white">
                        <q-item-section >
                          <q-item-label v-if="authUser.cardTextColor" :style="{color: authUser.cardTextColor}">card</q-item-label>
                          <q-item-label v-else style="color: black">card</q-item-label>
                        </q-item-section>

                      </q-card>
                    </q-img>
                  </q-card>
                </div>


                <q-file
                    v-model="authUser.backgroundUrl"
                    filled
                    bg-color="blue-grey-2"
                    label="Restricted to images"
                    multiple
                    accept=".jpg, image/*"
                    @rejected="onRejected"
                    @update:model-value="previewUploadImg"
                    class="q-ma-md"
                >

                  <q-icon name="cloud_upload" />

                </q-file>

                <q-input
                    filled
                    v-model="authUser.textColor"
                    bg-color="blue-grey-2"
                    label="text colour"
                    class=" q-ma-md"
                >

                  <template v-slot:append>
                    <q-icon name="colorize" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-color v-model="authUser.textColor" />
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>

                <q-input
                    filled
                    v-model="authUser.siteColor"
                    format-model="rgba"
                    bg-color="blue-grey-2"
                    label="Background colour"
                    class=" q-ma-md"
                >
                  <!--                :rules="['anyColor']"  dont know if i  wart rules         -->
                  <template v-slot:append>
                    <q-icon name="colorize" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-color v-model="authUser.siteColor" />
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
                             <q-input
                                  filled
                                  v-model="authUser.cardColor"
                                  format-model="rgba"
                                  bg-color="blue-grey-2"
                                  label="card Background colour"
                                  class=" q-ma-md"
                              >

                                <template v-slot:append>
                                  <q-icon name="colorize" class="cursor-pointer">
                                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                      <q-color v-model="authUser.cardColor" />
                                    </q-popup-proxy>
                                  </q-icon>
                                </template>
                              </q-input>
                              <q-input
                                  filled
                                  v-model="authUser.cardTextColor"
                                  format-model="rgba"
                                  bg-color="blue-grey-2"
                                  label="card text colour"
                                  class=" q-ma-md"
                              >

                                <template v-slot:append>
                                  <q-icon name="colorize" class="cursor-pointer">
                                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                      <q-color v-model="authUser.cardTextColor" />
                                    </q-popup-proxy>
                                  </q-icon>
                                </template>
                              </q-input>
                <q-input
                    filled
                    v-model="authUser.buttonColor"
                    format-model="rgba"
                    bg-color="blue-grey-2"
                    label="button color"
                    class=" q-ma-md"
                >

                  <template v-slot:append>
                    <q-icon name="colorize" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-color v-model="authUser.buttonColor" />
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
                <q-input
                    filled
                    v-model="authUser.buttonTextColor"
                    format-model="rgba"
                    bg-color="blue-grey-2"
                    label="button text color"
                    class=" q-ma-md"
                >

                  <template v-slot:append>
                    <q-icon name="colorize" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-color v-model="authUser.buttonTextColor" />
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
                <!--Maybe the google fonts api to  choose font  -->
                <!--Api key  -- https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyD_aETXW47xdmqKHjy7YFUgYjznGLdVQf4  -->
                <q-btn label="Save" type="submit" color="primary"/>
              </q-form>


            </q-tab-panel>

            <q-tab-panel name="AccountDetails">
              <div  style="color: black"  class="text-h4 q-mb-md">Account Information </div>
              <div class="q-pa-md" style="max-width: 400px">

                <q-form

                    @submit="savePersonlizations"
                    class="q-gutter-md"
                >
                  <q-input
                      outlined
                      filled
                      v-model="authUser.displayName"
                      label="username"
                      bg-color="blue-grey-2"
                      lazy-rules
                      :rules="[ val => val && val.length > 0 || 'Please type something']"
                  />
                  <q-input
                      outlined
                      filled
                      disabled
                      v-model="authUser.email"
                      label="Email"
                      bg-color="blue-grey-2"
                      lazy-rules
                      :rules="[ val => val && val.length > 0 || 'Please type something']"
                  />

                  <!--                <q-input
                                      outlined
                                      filled
                                     type="password"
                                      v-model="authUser.password"
                                      bg-color="blue-grey-2"
                                      label="Password"
                                      lazy-rules
                                  />-->

                  <div>
                    <q-btn label="Save" type="submit" color="primary"/>

                  </div>
                </q-form>

              </div>
            </q-tab-panel>
          </q-tab-panels>
        </template>

      </q-splitter>
    </div>
  </q-page>
  <home-view v-else :auth-user="authUser" />
</template>

<style scoped>
.card{
  max-height: 200px;
  max-width: 400px;
  overflow:hidden;
}
</style>