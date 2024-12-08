<script>
import User from "@/components/models/User.js";
import Cluster from "@/components/models/Clust.js";
import Classification from "@/components/models/Classification.js";
import {ref} from "vue";

export default {
  name: "settings",
  data: function() {
    return {
      tab: ref('Personalization'),
      splitterModel: ref(20)

    }},
  props:{
    authUser: {type: User, required: true},
  },
}
</script>

<template>
  <div class="q-pa-xl row justify-center">
    <q-splitter
        v-model="tab"
        class="justify-center q-pa-md"
    >

      <template v-slot:before>
        <q-tabs
            v-model="tab"
            vertical
            class="text-teal"
        >
          <q-tab name="Personalization" label="Personalization" />
          <q-tab name="AccountDetails" label="Account Details" />


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
            <div class="text-h4 q-mb-md">Mails</div>

            <div>
            <q-card class="my-card">
              <q-item>
                <q-item-section>
                  <q-item-label


                  >Clusters</q-item-label>
                </q-item-section>
              </q-item>

              <img v-if="authUser.backgroundUrl !== ''" :src="authUser.backgroundUrl">
              <img v-else src="https://cdn.quasar.dev/img/parallax2.jpg">
            </q-card>
  </div>
            <div class="controls">

              <q-file

                  v-model="filesImages"
                  filled
                  label="Restricted to images"
                  multiple
                  accept=".jpg, image/*"
                  @rejected="onRejected">
                <q-icon name="cloud_upload" />

              </q-file>

              <q-input
                  filled
                  v-model="authUser.textColor"

                  hint="text colour"
                  class="my-input"
              >
<!--                :rules="['anyColor']"  dont know iff i  wart rules         -->
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

                  hint="text colour"
                  class="my-input"
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
<!--Maybe the google fonts api to  choose font  -->
<!--Api key  -- https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyD_aETXW47xdmqKHjy7YFUgYjznGLdVQf4  -->


            </div>

          </q-tab-panel>

          <q-tab-panel name="AccountDetails">
            <div class="text-h4 q-mb-md">Alarms</div>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
          </q-tab-panel>
        </q-tab-panels>
      </template>

    </q-splitter>
  </div>
</template>

<style scoped>

</style>