<script>
import Cluster from "@/components/models/Clust.js";
import User from "@/components/models/User.js";
import ClusterCollection from "@/firebase/ClusterCollection.js";
import ClassificationCollection from "@/firebase/ClassificationCollection.js";
import Classification from "@/components/models/Classification.js";
import ClassificationList from "@/components/ClassificationList.vue";


export default {
  name: "EditCluster",
  data: function () {
    return {
      confirm: false,
      editCluster: new Cluster(),
      classification: new Classification(),
      list: [],
    }
  },
  components: { ClassificationList},
  props: {
    clusterId: {
      type: String,
      required: true
    },
    authUser: {type: User, required: true},

  },

  async mounted() {

    console.log(this.clusterId + "Edit cluster")


   this.editCluster = await ClusterCollection.getCluster(this.authUser, this.clusterId)
    this.getSyncList()
  },
  methods: {

    deleteClassification() {
      console.log('got here')
    },
    editClassification() {
      console.log('got here edit')
    },

    Cancel() {
      this.$router.push({name: 'Cluster', params: {clusterId: this.clusterId}})
    },
    editCurrentCluster() {
      debugger
           ClusterCollection.updateCluster(this.authUser, this.editCluster)
          .then(docRef => this.editCluster.classifications.forEach((item) => {
                console.log(docRef + " doc ref")
               ClassificationCollection.updateClassification(this.authUser, docRef, item)
            }))
               .then(() => this.$router.push({name: 'Cluster', params: {clusterId: this.clusterId}}))
               .catch(error => console.log(error));
    },
    getSyncList(){
      if(this.authUser?.id) {
        ClassificationCollection.syncClassifications(this.authUser, this.editCluster, this.list)

      }


  },
    AddNewClassification(classification ){
      ClassificationCollection.addClassification(this.authUser,this.editCluster,classification).then(() => this.classification = new Classification())
    },

  watch: {
    authUser: {
      handler() {
        this.getSyncList()

      },
      deep: true,
    },
    editCluster:{
      deep:true,
    }
  }
}}
</script>

<template>


  <q-page-container>


    <div class="row justify-center ">
      <div class="col-6 text-center text-h3 q-pa-lg">
        Edit Cluster
      </div>
    </div>

    <div class="q-pa-xl row justify-center">
      <div class="col-6">
        <q-form
            @submit.prevent="editCurrentCluster"
            class="q-gutter-md form-background"
        >

          <q-input
              filled
              v-model="editCluster.name"
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
            <q-btn round dense flat icon="add" @click="AddNewClassification(classification)"></q-btn>
          </q-input>


          <classification-list @delete-classification="clas => deleteClassification()"
                               :list="list"></classification-list>
          <!-- needs to be pulled from database -->


          <q-toggle v-model="editCluster.isPublic" label="Public"></q-toggle>
          <br>
          <q-toggle v-model="editCluster.favorite" label="Favorite"></q-toggle>


          <div class="flex justify-end">
            <q-btn label="Cancel" @click="Cancel"  class="q-ml-lg"></q-btn>
            <q-btn label="Submit" type="submit" color="primary"></q-btn>
          </div>

        </q-form>
      </div>
    </div>


  </q-page-container>

</template>

<style scoped>

</style>