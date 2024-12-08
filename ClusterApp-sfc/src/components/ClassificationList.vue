<script>
import ClassificationItem from "@/components/ClassificationItem.vue";

export default {
  name: "ClassificationList",
  components: {ClassificationItem},

  data: function(){
    return {}
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
    deleteClassi(item){
      debugger
      this.newCluster.classifications.splice(this.newCluster.classifications.getItems().indexOf(item),1)
    },

  },
}
</script>

<template>
  <q-list class="bg-grey-11" bordered separator >
    <q-item-label header>Classifications</q-item-label>
    <classification-item  @delete-classification="clas => $emit('delete-classification',clas)"  clickable v-for="clas in list" :clas="clas"></classification-item>
  </q-list>
</template>

<style scoped>

</style>