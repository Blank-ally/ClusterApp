<script>

import User from "@/components/models/User.js";
import Cluster from "@/components/models/Clust.js";

export default {
  name: "ClusterItem",
  data: function(){
    return {


    }
  },

  // props:   Data passed into the component via attributes.
  //          Props can be optional or required. Objects and arrays
  //          are pass-by-reference. Primitives (number, string, boolean)
  //          are pass-by-value.
  props: {
    cluster:{
      type: Cluster,
      required: true
    },
    authUser: {type: User, required: true},

  },

  // methods: Usually "events" triggered by v-on:
  methods: {

    SetCurrentCluster() {
debugger;
console.log(this.cluster.id)
this.$router.push({name:'Cluster', params:{clusterId:this.cluster.id}})


    },

  },

  // computed:    Values that are updated and cached if dependencies change.
  //              Computed value functions need to return a value.
  //              Treat these like regular values that you would use
  //              in data or props.
  computed: {

  },


  mounted: function () {
// this could also be done in the crated block as well

    if(localStorage.getItem('currentCluster')){
      this.currentCluster = JSON.parse(localStorage.getItem('currentCluster'))
    }
  },

}
</script>

<template>

  <q-card class="my-card cursor-pointer"  @click="SetCurrentCluster" >  <!-- @click="SetCurrentCluster()-->
    <div class="row">
      <div v-for="(star, x) in cluster.Stars" class="col-6">
        <img style="max-height: 90px; max-width: 150px;width: 100%; height: 100%;" v-if="x <= 3 " :src="star.photo"/>
      </div>
    </div>
    <q-card-section>

      <div class="text-h6">{{cluster.name}}</div>

    </q-card-section>
  </q-card>

</template>

<style scoped>

</style>