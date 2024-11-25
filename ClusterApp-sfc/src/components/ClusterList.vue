<script>
import clust from "@/components/models/Clust.js";
import LSearch from "@/components/LSearch.vue";
import ClusterItem from "@/components/ClusterItem.vue";
import Clust from "@/components/models/Clust.js";
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
  //          are pass-by-reference. Primitives (number, string, boolean)
  //          are pass-by-value.
  props: {
    list:{
      type: Array,
      required: true
    }

  },

  // methods: Usually "events" triggered by v-on:
  methods: {
    search(keyword){
      console.log('search: ', keyword);
      this.filterKeyword = keyword;
    },
    sort(property){
      this.sortProperty = property;
    },
    print(){
      console.log(this.list)
    },


  },

  // computed:    Values that are updated and cached if dependencies change.
  //              Computed value functions need to return a value.
  //              Treat these like regular values that you would use
  //              in data or props.
  computed: {
    filteredlist(){
      console.log("This is running")
 return this.list.filter(clust => {
        return clust.name.toLowerCase().includes(this.filterKeyword.toLowerCase())

     })

    }

  }
}
</script>

<template>
  <div>
    <div class="col-6 col-md-4">
    <l-search :onSearch="search"></l-search>
    </div>
    <div class="row q-col-gutter-md">
      <div class="col-lg-4 col-sm-6" v-for="cluster in filteredlist">
     <cluster-item :cluster="cluster"></cluster-item>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>