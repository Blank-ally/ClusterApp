<script>

import Star from "@/components/models/Star.js";
import User from "@/components/models/User.js";
import Cluster from "@/components/models/Clust.js";
import ClusterCollection from "@/firebase/ClusterCollection.js";
import ClassificationCollection from "@/firebase/ClassificationCollection.js";
import StarCollection from "@/firebase/StarCollection.js";
import HomeView from "@/views/HomeView.vue";


export default {
  name: "EditStar",
  data: function() {
    return {
      editStar: new Star() ,
      currentCluster: new Cluster(),
      confirm: false,
      previewImg: false,

    }},
  components:{HomeView},
  props: {
    clusterId:{
      type: String,
      required: true
    },
    starId:{
      type: String,
      required: true
    },
    authUser: {type: User, required: true},
  },

  async mounted() {


    this.currentCluster =  await ClusterCollection.getCluster(this.authUser,this.clusterId)

    this.currentCluster.classifications = await ClassificationCollection.getClassifications(this.authUser,this.currentCluster)

    this.editStar = await StarCollection.getStar(this.authUser,this.currentCluster,this.starId)


  },
  methods:{
    editCurrentStar(){
      debugger
      console.log(this.authUser,this.currentCluster,this.editStar)
      StarCollection.updateStar(this.authUser,this.currentCluster,this.editStar)
          .then(() => this.$router.push({name: 'Cluster', params:{clusterId: this.clusterId}}))
          .catch(error => console.log(error))
    },
    deleteStar(){
      StarCollection.deleteStar(this.authUser,this.currentCluster,this.editStar)
          .then(() => this.$router.push({name: 'Cluster', params:{clusterId: this.clusterId}}))
          .catch(error => console.log(error))
    },
    cancel(){
      this.$router.push({name: 'Cluster',  params:{clusterId: this.clusterId}})
    },
    previewUploadImg(){
      console.log('img', this.editStar.photoURL);
      this.previewImg = URL.createObjectURL(this.editStar.photoURL[0])
    }
  }
}

</script>

<template>
  <q-page  v-if="authUser?.exists()">
    <q-page-container>
      <div class="row justify-center ">
        <div v-if="authUser.textColor" :style="{color: authUser.textColor}"  class="col-6 text-center text-h3 q-pa-lg">
          Edit Star
        </div>
        <div v-else style="color:#1976D2" class="col-6 text-center text-h3 q-pa-lg">
          Edit Star
        </div>
      </div>

      <div class="q-pa-xl row justify-center ">
        <div class="col-md-6 col-12 ">
          <q-form
              @submit.prevent="editCurrentStar"
              reset="onReset"
              class="q-gutter-xl form-background"
          >
            <div class="row">
              <div class="col-12">
                <q-btn style="color: white" padding="lg xl" flat  @click="confirm = true">
                  <q-icon>
                    <i  class="fa-solid fa-trash"></i>
                  </q-icon>
                </q-btn>

              </div>
              <div class="col-md-6 col-12">


                <q-img v-if="previewImg" :src="previewImg" :ratio="4/3"></q-img>
                <q-img v-else-if="editStar?.photoURL !== '' " :src="editStar.photoURL" :ratio="4/3"></q-img>
                <q-img v-else src="@/assets/StarDefault.png" :ratio="4/3"></q-img>


                <q-input
                    filled
                    v-model="editStar.photoURL"
                    lazy-rules
                    bg-color="white"
                    type="file"
                    class="q-ma-md"
                    @change="previewUploadImg"
                ></q-input>
              </div>
              <div class="col-md-6 col-12">

                <q-input
                    filled
                    v-model="editStar.name"
                    label="Star Name"
                    lazy-rules
                    accept=".jpg, image/*"
                    bg-color="white"
                    class="q-ma-md"
                    :rules="[ val => val && val.length > 0 || 'Please type something']"

                ></q-input>

                <q-select style="background: white" class="q-ma-md" v-if="currentCluster.classifications.length" standout v-model="editStar.classification"  label="Classifications" :options="currentCluster.classifications?.map(item => ({value: item.name, label: item.name}))" ></q-select>
                <q-input
                    filled
                    type="number"
                    v-model="editStar.qty"
                    label="Qty"
                    lazy-rules
                    class="q-ma-md"
                    bg-color="white"
                    :rules="[
            val => val !== null && val !== '' || 'Please type your age',
            val => val > 0 && val < 100 || 'Please type a real age'
          ]"
                ></q-input>
                <q-input
                    v-model="editStar.notes"
                    filled
                    label="Notes"
                    type="textarea"
                    bg-color="white"
                    class="q-ma-md"
                ></q-input>

              </div>
            </div>

            <div class="flex justify-end">
              <q-btn label="Cancel" @click="cancel"  style="color: white" class="q-mr-lg"></q-btn>
              <q-btn label="Submit"  type="submit" :style="{color: authUser?.buttonTextColor || white, background: authUser?.buttonColor|| '#1976D2' }"></q-btn>



            </div>

          </q-form>
        </div>
      </div>
      <!-- modal -->
      <q-dialog v-model="confirm" persistent>
        <q-card  style="width: 700px; max-width: 80vw;">
          <q-card-section class="row items-center">

            <div class="text-h6">Delete {{editStar.name}}?</div>
          </q-card-section>

          <q-card-section class="q-pt-none">

            Once deleted a Star cannot be recovered are you sure you want to delete this Star.
          </q-card-section>

          <q-card-actions align="right">
            <div class="q-gutter-xl">
              <q-btn flat label="Delete" :style="{color: authUser?.buttonTextColor || white, background: authUser?.buttonColor|| '#1976D2' }" v-close-popup @click="deleteStar()"></q-btn>
            </div>
            <div class="q-gutter-xl">
              <q-btn flat label="Cancel" :style="{color: authUser?.buttonTextColor || white, background: authUser?.buttonColor|| '#1976D2' }" v-close-popup ></q-btn>
            </div>
          </q-card-actions>
        </q-card>
      </q-dialog>

    </q-page-container>
  </q-page>
  <home-view v-else :auth-user="authUser"/>

</template>

<style scoped>

</style>