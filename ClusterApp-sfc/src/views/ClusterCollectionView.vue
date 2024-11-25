<script>
import ClusterItem from "@/components/ClusterItem.vue";
import LSearch from "@/components/LSearch.vue";
import ClusterList from "@/components/ClusterList.vue";
import User from "@/components/models/User.js";
import {db} from "@/firebase/index.js";

export default {
  name: "HomeView",
  components: {ClusterItem, LSearch,ClusterList,User,db},
  props: {
    list:{
      type: Array,
      required: true
    },
    authUser: {type: User, required: true},

  }}
</script>

<template>


</template>

<style scoped>

</style>