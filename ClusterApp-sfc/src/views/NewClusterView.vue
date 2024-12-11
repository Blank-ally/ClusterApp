<script>

import Cluster from "@/components/models/Clust.js";
import ClassificationList from "@/components/ClassificationList.vue";
import ClusterCollection from "@/firebase/ClusterCollection.js";
import ClassificationCollection from "@/firebase/ClassificationCollection.js";
import Classification from "@/components/models/Classification.js";
import User from "@/components/models/User.js";
import HomeView from "@/views/HomeView.vue";

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
  components: {ClassificationList,HomeView},
  methods: {
    deleteClassification(clas){
    let ind = this.newCluster.classifications.indexOf(clas)
      this.newCluster.classifications.splice(ind)

    },
    editClassification(clas){


    },
    AddNewClassification() {
      if(this.classification.name.trim() !== "" ) {
        this.newCluster.addClassification(this.classification)
        this.classification = new Classification()
      }
    },
    AddNewCluster() {
      debugger
      ClusterCollection.addCluster(this.authUser, this.newCluster)
          .then(docRef =>
              {this.newCluster.classifications
                  .forEach((item) =>
              {
                console.log(docRef)
                ClassificationCollection.addClassification(this.authUser, docRef, item)

              });
            return docRef}
          ).then(docRef =>  this.$router.push({name: 'NewStar', params: {clusterId: docRef.id}}))
          .catch(error => console.log(error));

    },
    Cancel() {
      this.$router.push({name: 'ClusterCollection'})

    },


  },
}


</script>

<template>
  <q-page  v-if="authUser?.exists()">

  <q-page-container>


    <div class="row  flex justify-center ">
      <div v-if="authUser.textColor" :style="{color: authUser.textColor}" class="col-md-6 col-12 text-center text-h3 q-pa-lg">
        New Cluster
      </div>
      <div v-else style="color:#1976D2 " class="col-md-6 col-12 text-center text-h3 q-pa-lg">
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
            <q-btn round dense flat v-if="authUser.siteColor" :style="{color: authUser.siteColor}"  label="Add" @click="AddNewClassification"></q-btn>
            <q-btn round dense flat v-else  label="Add" @click="AddNewClassification"></q-btn>
          </q-input>


          <classification-list @edit-classification="clas => editClassification(clas)"  @delete-classification="clas => deleteClassification(clas)" :list="newCluster.classifications"></classification-list>

<!--
          <q-toggle v-model="newCluster.isPublic" label="Public"></q-toggle>
<br>
          <q-toggle v-model="newCluster.favorite" label="Favorite"></q-toggle>-->




          <div class="flex justify-end">
            <q-btn label="Cancel" @click="Cancel"  style="color: white" class="q-mr-lg"></q-btn>
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