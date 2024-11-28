<script >

import App from "@/App.vue";

import newCluster from "@/components/ClusterList.vue";
import Clust from "@/components/models/Clust.js";
import ClassificationList from "@/components/ClassificationList.vue";

import addNewCluster from "@/components/ClusterList.vue";
import ClusterCollection from "@/firebase/ClusterCollection.js";
import ClassificationCollection from "@/firebase/ClassificationCollection.js";
import Classification from "@/components/models/Classification.js";
import ClassificationItem from "@/components/ClassificationItem.vue";
import User from "@/components/models/User.js";

export default {
  name: "Cluster",

  data: function() {
    return {
      newCluster: new Clust(),
      classification: new Classification(),

    }},
  props:{
    authUser: {type: User, required: true},
  },
  components: {newCluster,ClassificationList,addNewCluster},
  methods:{
    AddNewClassification(){
      this.newCluster.addClassification(this.classification)
      this.classification = new Classification()
    },
    AddNewCluster(){
      debugger
      ClusterCollection.addCluster(this.authUser,this.newCluster)
          .then(docRef => this.newCluster.classifications.forEach((item) => {
            console.log(docRef)
            ClassificationCollection.addClassification(this.authUser,docRef,item)
          })
          );
    }
  },
}

// TODO: request the cluster types pull  from the database

</script>

<template>


    <q-page-container>


      <div class="row justify-center ">
        <div class="col-6 text-center text-h3 q-pa-lg">
          New Cluster
        </div>
      </div>

      <div class="q-pa-xl row justify-center ">
        <div class="col-6">
          <q-form
              @submit.prevent="AddNewCluster"
              class="q-gutter-sm">

            <q-input
                filled
                v-model="newCluster.name"
                label="Cluster Name *"
                lazy-rules
                bg-color="white"
                :rules="[ val => val && val.length > 0 || 'Please type something']"
            ></q-input>


            <q-input  filled
                      label="New Classification"
                      v-model="classification.name"
                      lazy-rules
                      bg-color="white">
              <q-btn round dense flat icon="add" @click="AddNewClassification"></q-btn>
            </q-input>



            <classification-list :list="newCluster.classifications"></classification-list>


            <q-toggle v-model="newCluster.public" label="Public"></q-toggle>

            <q-toggle v-model="newCluster.favorite" label="Favorite"></q-toggle>

<!--            <q-select standout v-model="newCluster.type" :options="clusterTypes" label="Collection Type"  bg-color="white"></q-select>-->




            <q-btn label="Submit" to="/NewStar" type="submit" color="primary"></q-btn>

            <q-btn label="Cancel" to="/Cluster" color="primary" class="q-ml-lg"></q-btn>


          </q-form>

        </div>
      </div>


    </q-page-container>


</template>

<style scoped>

</style>