<script>
import StarItem from "@/components/StarItem.vue";
import User from "@/components/models/User.js";

export default {
  name: "StarList",
  components: {StarItem},
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
    },
    clusterId:{
      type:String,
      required: true,
    },
    authUser: {type: User, required: true},
  },

  // methods: Usually "events" triggered by v-on:
  methods: {


  },

  // computed:    Values that are updated and cached if dependencies change.
  //              Computed value functions need to return a value.
  //              Treat these like regular values that you would use
  //              in data or props.
  computed: {

  },

}
</script>

<template>
  <div class="row q-col-gutter-md">
    <div class="col-lg-3 col-sm-6" v-for="item in list">
      <star-item :auth-user="authUser" :cluster-id="clusterId" :star="item"></star-item>
    </div>
  </div>
</template>

<style scoped>

</style>