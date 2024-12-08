<script>
import ClusterCollection from "@/firebase/ClusterCollection.js";
import LSearch from "@/components/LSearch.vue";
import ClusterItem from "@/components/ClusterItem.vue";
import User from "@/components/models/User.js";
//TODO:Get list from  database
export default {
  name: "ClusterList",
  components: {ClusterItem, LSearch},
  data: function(){
    return {
      filterKeyword: '',

    }
  },

  // props:   Data passed into the component via attributes.
  //          Props can be optional or required. Objects and arrays
  //          are pass-by-reference. Primitis (number, string, boolean)
  //          are pass-by-value.
  props: {
    list:{
      type: Array,
      required: true
    },
    authUser: {type: User, required: true},

  },

  // methods: Usually "events" triggered by v-on:
  methods: {
    search(keyword){
      console.log('search: ', keyword);
      ClusterCollection.searchCluster(this.authUser,keyword,this.list)

    },

  },

  // computed:    Values that are updated and cached if dependencies change.
  //              Computed value functions need to return a value.
  //              Treat these like regular values that you would use
  //              in data or props.
  computed: {






  }
}
</script>

<template>
  <div>
    <div class="col-6 col-md-4">
    <l-search :onSearch="search"></l-search>
<!--      TODO: change to request to  database -->
    </div>
    <div class="row q-col-gutter-md">
      <div class="col-lg-4 col-sm-6" v-for="cluster in list">
     <cluster-item :cluster="cluster" auth-user="authUser"></cluster-item>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>