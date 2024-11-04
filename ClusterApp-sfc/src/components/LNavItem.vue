<script>
export default {
  name: "LNavItem",
  data: function(){
    return {}
  },

  // props:   Data passed into the component via attributes.
  //          Props can be optional or required. Objects and arrays
  //          are pass-by-reference. Primitives (number, string, boolean)
  //          are pass-by-value.
  props: {
    page:{
      type: Object,
      required: true
    }

  },

  // methods: Usually "events" triggered by v-on:
  methods: {



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
  <li class="nav-item">
    <a class="nav-link active" aria-current="page" :href="this.page.link">{{this.page.name}}</a>
  </li>
</template>

<style scoped>

</style>