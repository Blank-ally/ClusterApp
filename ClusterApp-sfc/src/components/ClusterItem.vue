<script>

import User from "@/components/models/User.js";
import Cluster from "@/components/models/Clust.js";
import Star from "@/components/models/Star.js"
import StarCollection from "@/firebase/StarCollection.js";
import UserCollection from "@/firebase/UserCollection.js";
export default {
  name: "ClusterItem",
  data: function(){
    return {
        list: [],
      loaded: false,

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
    getSyncList(){
        StarCollection.syncStarsWithImages(this.authUser, this.cluster, this.list)
            .then(() => console.log())
            .catch(error => console.log(error))

    },


  },
/*  async created() {
    if (this.userId) {
      this.user = await UserCollection.getUser(this.userId);
      //await FriendshipCollection.syncFriendships(this.user, this.userFriendships);

      // simulate wait to demonstrate skeleton loader
      // DON'T LEAVE THIS IN PRODUCTION CODE!!!
      await new Promise(resolve => setTimeout(resolve, 1000));

      this.loaded = true;
    }*/
  async mounted() {
    this.loaded = true
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

  <q-card :style="{color:authUser?.cardTextColor || black, background: authUser?.cardColor || white }" class="my-card cursor-pointer"  @click="SetCurrentCluster" v-if="loaded">  <!-- @click="SetCurrentCluster()-->
    <div class="row">
      <div v-for="star in list" class="col-6">
        <q-img style="max-height: 90px; max-width: 150px;width: 100%; height: 100%;" :src="star.photoURL"/>
      </div>
    </div>
    <q-card-section>

      <div class="text-h6">{{cluster.name}}</div>

    </q-card-section>
  </q-card>

  <q-card v-else class="my-card cursor-pointer"  @click="SetCurrentCluster" >
    <q-skeleton height="150px" square />

    <q-card-section >
      <q-skeleton type="text" class="text-subtitle1" />
      <q-skeleton type="text" width="50%" class="text-subtitle1" />
      <q-skeleton type="text" class="text-caption" />
    </q-card-section>
  </q-card>

</template>

<style scoped>

</style>