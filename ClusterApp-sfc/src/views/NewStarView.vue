<script >

import Star from "@/components/models/Star.js";
import User from "@/components/models/User.js";
import Cluster from "@/components/models/Clust.js";
import ClusterCollection from "@/firebase/ClusterCollection.js";
import ClassificationCollection from "@/firebase/ClassificationCollection.js";
import StarCollection from "@/firebase/StarCollection.js";
import HomeView from "@/views/HomeView.vue";

export default {
  name: "NewStar",
  data: function() {
    return {
      newStar: new Star() ,
      currentCluster: new Cluster(),
      previewImg: false,
      img: null,

    }},
  components:{HomeView},

  props: {
    clusterId:{
      type: String,
      required: true
    },
    authUser: {type: User, required: true},
  },

  async mounted() {
    this.currentCluster =  await ClusterCollection.getCluster(this.authUser,this.clusterId)
    this.currentCluster.classifications = await ClassificationCollection.getClassifications(this.authUser,this.currentCluster)
  },
  methods:{
    addnewStar(){
    StarCollection.addStar(this.authUser,this.currentCluster,this.newStar)
        .then(() => this.$router.push({name: 'Cluster', params:{clusterId: this.clusterId}}))
        .catch(error => console.log(error))},

    cancel(){
      this.$router.push({name: 'Cluster',  params:{clusterId: this.clusterId}})
    },
    previewUploadImg(){
      console.log('img', this.newStar.photoURL[0]);
      this.previewImg = URL.createObjectURL(this.newStar.photoURL[0])
    }
  }
}

</script>

<template>


  <q-page  v-if="authUser?.exists()">
    <q-page-container>
      <div class="row  flex justify-center ">
        <div v-if="authUser.textColor" :style="{color: authUser.textColor}" class="col-6 text-center text-h3 q-pa-lg">
          New Star
        </div>
        <div v-else style="color:#1976D2 " class="col-6 text-center text-h3 q-pa-lg">
          New Star
        </div>
      </div>

      <div class="q-pa-xl row justify-center ">
        <div class="col-md-6 col-12 ">
          <q-form
              @submit.prevent="addnewStar"
              reset="onReset"
              class="q-gutter-xl form-background"
          >
            <div class="row">
              <div class="col-md-6 col-12">

                <q-img   v-if="previewImg" :src="previewImg" :ratio="4/3" ></q-img>
                <q-img   v-else src="@/assets/StarDefault.png" :ratio="4/3"></q-img>


            <q-input
                class="q-ma-md"
                filled
                v-model="newStar.photoURL"
                lazy-rules
                bg-color="white"
                type="file"
                @change="previewUploadImg"
            ></q-input>
              </div>
              <div class="col-md-6 col-12">

            <q-input
                filled
                v-model="newStar.name"
                label="Star Name"
                lazy-rules
                bg-color="white"
                class="q-ma-md"
                :rules="[ val => val && val.length > 0 || 'Please type something']"

            ></q-input>

            <q-select style="color: #0c0101;background: white" class="q-ma-md" v-if="currentCluster.classifications.length" standout v-model="newStar.classification"  label="Classifications" :options="currentCluster.classifications?.map(item => ({value: item.name, label: item.name}))" ></q-select>

            <q-input
                filled
                type="number"
                v-model="newStar.qty"
                label="Qty"
                lazy-rules
                bg-color="white"
                class="q-ma-md"
                :rules="[
            val => val !== null && val !== '' || 'Please type your age',
            val => val > 0 || 'Please enter a Qty'
          ]"
            ></q-input>
            <q-input
                v-model="newStar.notes"
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
                  <q-btn v-if="authUser.siteColor" label="Submit"  type="submit" :style="{background: authUser.siteColor,color: authUser.textColor}"></q-btn>
                  <q-btn v-else  label="Submit"  type="submit" color="primary"></q-btn>


                </div>






          </q-form>
        </div>
      </div>


    </q-page-container>
  </q-page>
  <home-view v-else :auth-user="authUser"/>

</template>

<style scoped>

</style>