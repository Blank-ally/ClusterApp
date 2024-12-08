<script>

import Cluster from "@/components/models/Clust.js";
import ClassificationList from "@/components/ClassificationList.vue";
import ClusterCollection from "@/firebase/ClusterCollection.js";
import ClassificationCollection from "@/firebase/ClassificationCollection.js";
import Classification from "@/components/models/Classification.js";
import User from "@/components/models/User.js";

export default {
  name: "Cluster",

  data: function () {
    return {
      newCluster: new Cluster(),
      classification: new Classification(),

    }
  },
  props: {

    authUser: {type: User, required: true},
  },
  components: {ClassificationList},
  methods: {
    deleteClassification(){
      console.log('here add a thing for the cluster  ')

    },
    AddNewClassification() {
      this.newCluster.addClassification(this.classification)
      this.classification = new Classification()
    },
    AddNewCluster() {
      debugger
      ClusterCollection.addCluster(this.authUser, this.newCluster)
          .then(docRef => {this.newCluster.classifications.forEach((item) => {
                console.log(docRef)
                ClassificationCollection.addClassification(this.authUser, docRef, item)

              }); return docRef}
          ).then(docRef =>  this.$router.push({name: 'NewStar', params: {clusterId: docRef.id}}))
          .catch(error => console.log(error));

    },
    Cancel() {
      this.$router.push({name: 'ClusterCollection'})

    },


  },
}

// TODO: request the cluster types pull  from the database

</script>

<template>


  <q-page-container>


    <div class="row justify-center ">
      <div class="col-md-6 col-12 text-center text-h3 q-pa-lg">
        New Cluster
      </div>
    </div>

    <div class="q-pa-xl row justify-center ">
      <div class="col-md-6 col-12 ">
        <q-form
            @submit.prevent="AddNewCluster"
            class="q-gutter-sm form-background">

          <q-input
              filled
              v-model="newCluster.name"
              label="Cluster Name *"
              lazy-rules
              bg-color="white"
              :rules="[ val => val && val.length > 0 || 'Please type something']"
          ></q-input>


          <q-input filled
                   label="New Classification"
                   v-model="classification.name"
                   lazy-rules
                   bg-color="white">
            <q-btn round dense flat icon="add" @click="AddNewClassification"></q-btn>
          </q-input>


          <classification-list  @delete-classification="clas => deleteClassification()" :list="newCluster.classifications"></classification-list>


          <q-toggle v-model="newCluster.isPublic" label="Public"></q-toggle>
<br>
          <q-toggle v-model="newCluster.favorite" label="Favorite"></q-toggle>




          <div class="flex justify-end">
            <q-btn label="Cancel" @click="Cancel" class="q-mr-lg"></q-btn>
            <q-btn label="Submit"  type="submit" color="primary"></q-btn>


          </div>

        </q-form>

      </div>
    </div>


  </q-page-container>


</template>

<style scoped>

</style>