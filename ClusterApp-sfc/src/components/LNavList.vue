<script>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

export default {
  name: "LNavList",
  components: {FontAwesomeIcon},
  // data:    Data created and maintained by this component.
  //          This function is like a constructor. It gets called
  //          separately for each instance of this component
  data: function(){
    return {
      rightDrawerOpen: false,
    }
  },

  // props:   Data passed into the component via attributes.
  //          Props can be optional or required. Objects and arrays
  //          are pass-by-reference. Primitives (number, string, boolean)
  //          are pass-by-value.
  props: {
    pages: {
      type: Array,
      required: true
    },
    list: {
      type: Array,
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

  <q-header elevated >
    <q-toolbar>
      <q-toolbar-title>
        <q-btn flat  to="/"  :list="list">
          <q-icon name="fa-solid fa-meteor grad" right size="2em"/>
          Cluster
        </q-btn>

      </q-toolbar-title>

    </q-toolbar>


  </q-header>

</template>

<style scoped>

</style>