<script>
import ClusterItem from "@/components/ClusterItem.vue";
import LSearch from "@/components/LSearch.vue";
import ClusterList from "@/components/ClusterList.vue";
import User from "@/components/models/User.js";
import {db} from "@/firebase/index.js";

export default {
  name: "ClusterCollection",
  computed: {
    ClusterList() {
      return ClusterList
    }
  },
  components: {ClusterItem, LSearch,ClusterList,User,db},
  props: {
    list:{
      type: Array,
      required: true
    },
    authUser: {type: User, required: true},

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
<!--        <cluster-list :list="ClusterList"></cluster-list>-->
        <!--TODO: ask TYler for help with this-->
      </div>
    </div>
  </q-page-container>

</template>

<style scoped>

</style>