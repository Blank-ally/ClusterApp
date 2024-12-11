<script >

import Cluster from "@/components/models/Clust.js";
import StarList from "@/components/StarList.vue";
import StarItem from "@/components/StarItem.vue";
import ClusterCollection from "@/firebase/ClusterCollection.js";
import User from "@/components/models/User.js";
import StarCollection from "@/firebase/StarCollection.js";
import HomeView from "@/views/HomeView.vue";

export default {
  name: "Cluster",
  data: function() {
    return {
      confirm: false,
      currentCluster: new Cluster(),
      list:[]
    }},
  components: {StarList,HomeView},
  props: {
    clusterId:{
      type: String,
      required: true
    },
    authUser: {type: User, required: true},

  },

  async mounted() {

    this.currentCluster =  await ClusterCollection.getCluster(this.authUser,this.clusterId)
    this.getSyncList()
  },
  methods:{

    deleteClassification(){
      console.log('got here')
    },
    goToNewStar(){
      this.$router.push({name:'NewStar', params:{clusterId:this.clusterId}})
    },
    setEditCluster(){
      console.log(this.clusterId + 'clusterView')
      this.$router.push({name:'EditCluster', params:{clusterId:this.clusterId}})

    },
    getSyncList(){
      if(this.authUser?.id) {

        StarCollection.syncStars(this.authUser, this.currentCluster, this.list)
            .catch(error => console.log(error))
      }
    },
    deleteCluster(){
      ClusterCollection.deleteCluster(this.authUser,this.currentCluster)
          .then(() => this.$router.push({name: 'ClusterCollection'}))
          .catch(error => console.log(error))


    }

  },

  watch: {
    authUser: {
      handler() {
        this.getSyncList()
      },
      deep: true,
    }
  }
}
</script>
<template>
  <q-page  v-if="authUser?.exists()">

    <q-page-container>

      <div class="row justify-center ">
        <div class="col-md-6  justify-center text-h3">
          <div class="q-pa-xl">
            <q-card :style="{color: authUser?.cardTextColor || black, background:authUser?.cardColor || white}" class="header-card text-center">
              <q-card-section>
                <div class="text-h2 q-pa-sm">{{ currentCluster.name }}</div>
                <div class="text-h5">created: {{currentCluster.creationDate}}</div>
              </q-card-section>

              <q-card-actions align="around">
                <q-btn :style="{color: authUser?.buttonColor || '#1976D2'}" padding="lg xl" flat @click="setEditCluster" class="p-4">
                  <q-icon left >
                    <i class="fa-solid fa-pen-to-square"></i>
                  </q-icon>
                </q-btn>
                <q-btn :style="{color: authUser?.buttonColor || '#1976D2'}" padding="lg xl" flat  @click="confirm = true">
                  <q-icon>
                    <i class="fa-solid fa-trash"></i>
                  </q-icon>
                </q-btn>
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </div>


      <div class="row q-col-gutter-lg self-center">
        <div class="col-12">
          <div class=" q-pa-lg">
            <q-btn  flat  v-if="authUser.buttonColor" :style="{color: authUser?.buttonColor || '#1976D2'}"   @click="goToNewStar">
              <q-icon left size="1em">
                <i class="fa-solid fa-circle-plus fa-2x" ></i> </q-icon>
              New Star
            </q-btn>
            <q-btn  v-else flat color="primary" @click="goToNewStar">
              <q-icon left size="1em">
                <i class="fa-solid fa-circle-plus fa-2x" ></i> </q-icon>
              New Star
            </q-btn>
          </div>
        </div>
      </div>

      <div class="row q-col-gutter-lg self-center">

      </div>
      <div class="row q-col-gutter-lg self-center justify-center">
        <div class="col-8">
          <star-list :auth-user="authUser" :cluster-id="currentCluster.id" :list="list"></star-list>
        </div>
      </div>



      <!-- modal -->
      <q-dialog v-model="confirm" persistent >
        <q-card  :style="{color: authUser?.cardTextColor || black, background:authUser?.cardColor || white}" style="width: 700px; max-width: 80vw;">
          <q-card-section class="row items-center">

            <div class="text-h6">Delete {{currentCluster.name}}?</div>
          </q-card-section>

          <q-card-section class="q-pt-none">

            Once deleted a cluster cannot be recovered are you sure you want to delete this cluster.
          </q-card-section>

          <q-card-actions align="right">
            <div class="q-gutter-xl">
              <q-btn flat label="Delete" :style="{color: authUser?.buttonTextColor || white, background: authUser?.buttonColor|| '#1976D2' }" v-close-popup @click="deleteCluster"></q-btn>
            </div>
            <div class="q-gutter-xl">
              <q-btn :style="{color: authUser?.buttonTextColor || white, background: authUser?.buttonColor|| '#1976D2' }" flat label="Cancel"  v-close-popup ></q-btn>
            </div>
          </q-card-actions>
        </q-card>
      </q-dialog>

    </q-page-container>
  </q-page>
  <home-view v-else :auth-user="authUser"/>

</template>

<style>
/*@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}*/
</style>
