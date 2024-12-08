<script >

import Star from "@/components/models/Star.js";
import User from "@/components/models/User.js";
import Cluster from "@/components/models/Clust.js";
import ClusterCollection from "@/firebase/ClusterCollection.js";
import ClassificationCollection from "@/firebase/ClassificationCollection.js";
import StarCollection from "@/firebase/StarCollection.js";




export default {
  name: "NewStar",
  data: function() {
    return {
      newStar: new Star() ,
      currentCluster: new Cluster(),

    }},

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
          .catch(error => console.log(error))
    },
    cancel(){
      this.$router.push({name: 'Cluster',  params:{clusterId: this.clusterId}})
    }
  }
}
// TODO:ask tyler about making the this a stack for mobile but stay  split like the og
</script>

<template>



    <q-page-container>
      <div class="row justify-center ">
        <div class="col-6 text-center text-h3 q-pa-lg">
          New Star
        </div>
      </div>

      <div class="q-pa-xl row justify-center ">
        <div class="col-6">
          <q-form
              @submit.prevent="addnewStar"
              reset="onReset"
              class="q-gutter-xl form-background"
          >
            <div class="row">
              <div class="col-6">
<!--            <div class="q-pa-md">
              <div class="q-col-gutter-md justify-center">
                <div class="col-6 ">-->
                  <q-img v-if="newStar.photoURL != '' " :src="newStar.photoURL" :ratio="4/3"></q-img>
                <q-img v-else src="@/assets/StarDefault.png" :ratio="4/3"></q-img>

<!--                </div>
              </div>-->


<!--            </div>-->
            <q-input
                filled
                v-model="newStar.photoURL"
                lazy-rules
                bg-color="white"
                type="file"


            ></q-input>
              </div>
              <div class="col-6">

            <q-input
                filled
                v-model="newStar.name"
                label="Star Name"
                lazy-rules
                bg-color="white"
                :rules="[ val => val && val.length > 0 || 'Please type something']"

            ></q-input>
<!--            <q-input
                filled
                v-model="newStar.cluster"
                label="Cluster"
                lazy-rules
                disabled
                bg-color="white"
            >
            </q-input>-->
<!--newStar.cluster-->
            <q-select v-if="currentCluster.classifications.length" standout v-model="newStar.classification"  label="Classifications" :options="currentCluster.classifications?.map(item => ({value: item.name, label: item.name}))" bg-color="white"></q-select> <!--:options="currentCluster.classifications.map(item => ({value: item, label: item.name}))"-->


            <q-input
                filled
                type="number"
                v-model="newStar.qty"
                label="Qty"
                lazy-rules
                bg-color="white"
                :rules="[
            val => val !== null && val !== '' || 'Please type your age',
            val => val > 0 && val < 100 || 'Please type a real age'
          ]"
            ></q-input>
            <q-input
                v-model="newStar.notes"
                filled
                label="Notes"
                type="textarea"
                bg-color="white"
            ></q-input>
<!--

            <q-toggle v-model="newStar.Trade" label="Trade" ></q-toggle>-->
                <q-btn label="Cancel"  @click="cancel" class="q-ml-lg"></q-btn>

            <q-btn label="Submit" type="submit" color="primary"></q-btn>

              </div>
            </div>



          </q-form>
        </div>
      </div>


    </q-page-container>


</template>

<style scoped>

</style>