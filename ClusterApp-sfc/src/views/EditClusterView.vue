<script>
import Cluster from "@/components/models/Clust.js";
import User from "@/components/models/User.js";
import ClusterCollection from "@/firebase/ClusterCollection.js";
import ClassificationCollection from "@/firebase/ClassificationCollection.js";
import Classification from "@/components/models/Classification.js";
import ClassificationList from "@/components/ClassificationList.vue";
import HomeView from "@/views/HomeView.vue";


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
  components: { ClassificationList,HomeView},
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

    deleteClassification(clas) {
      console.log(clas)
      ClassificationCollection.deleteClassification(this.authUser,this.editCluster,clas)
          .catch(error => console.log(error))

    },
    editClassification(clas) {
      ClassificationCollection.updateClassification(this.authUser, this.editCluster, clas)
          .catch(error => console.log(error));
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
    AddNewClassification( ){
      if(this.classification.name.trim() !== ""){
        debugger
        ClassificationCollection.addClassification(this.authUser,this.editCluster,this.classification).then(() => this.classification = new Classification())
      }
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
  <q-page  v-if="authUser?.exists()">

    <q-page-container>


      <div class="row justify-center ">
        <div v-if="authUser.textColor" :style="{color: authUser.textColor}" class="col-6 text-center text-h3 q-pa-lg">
          Edit Cluster
        </div>

        <div  v-else style="color:#1976D2 " class="col-6 text-center text-h3 q-pa-lg">
          Edit Cluster
        </div>
      </div>

      <div class="q-pa-xl row justify-center ">
        <div class="col-md-6 col-12 ">
          <q-form
              @submit="editCurrentCluster"
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
              <q-btn round dense flat v-if="authUser.siteColor" :style="{color: authUser.siteColor}"  label="Add" @click="AddNewClassification"></q-btn>
              <q-btn round dense flat v-else  label="Add" @click="AddNewClassification"></q-btn>
            </q-input>


            <classification-list @edit-classification="clas => editClassification(clas)" @delete-classification="clas => deleteClassification(clas)"
                                 :list="list"></classification-list>


            <div class="flex justify-end">
              <q-btn label="Cancel" @click="Cancel"  style="color: white" class="q-mr-lg"></q-btn>
              <q-btn label="submit"  type="submit" :style="{color: authUser?.buttonTextColor || white, background: authUser?.buttonColor|| '#1976D2' }"></q-btn>

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