<script>
import ClusterItem from "@/components/ClusterItem.vue";
import LSearch from "@/components/LSearch.vue";
import ClusterList from "@/components/ClusterList.vue";
import User from "@/components/models/User.js";
import {db} from "@/firebase/index.js";
import ClusterCollection from "@/firebase/ClusterCollection.js";
import Cluster from "@/components/models/Clust.js";
import Classification from "@/components/models/Classification.js";

export default {
  name: "ClusterCollection",
  data: function() {
    return {
      list:[],


    }},
  computed: {
    ClusterCollection() {
      return ClusterCollection
    },
  },
  components: {ClusterItem, LSearch,ClusterList,User,db},
  props: {

    authUser: {type: User, required: true},

  },
  methods:{
    getSyncList(){
      if(this.authUser?.id) {
        ClusterCollection.syncClusters(this.authUser, this.list)
      }
    }

  },
  mounted() {
    this.getSyncList()
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
  <q-page-container>

    <div class="row justify-center ">
      <div class="col-6 text-center text-h3 q-pa-lg">
        Clusters
      </div>
    </div>

    <div class="row q-col-gutter-lg self-center">
      <div class="col-4">
        <div class=" q-px-lg">
          <q-btn flat color="primary"  to="/NewCluster">
            <q-icon name="fa-solid fa-circle-plus fa-2x" left size="1em"/>
            New Cluster
          </q-btn>
        </div>
      </div>
    </div>
    <div class="row q-col-gutter-lg self-center justify-center">
      <div class="col-8">
        <cluster-list :auth-user="authUser" :list="list"></cluster-list>
        <!--TODO ask TYler for help with this-->
      </div>
    </div>
  </q-page-container>

</template>

<style scoped>

</style>