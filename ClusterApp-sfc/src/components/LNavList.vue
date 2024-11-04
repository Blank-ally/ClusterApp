<script>
export default {
  name: "LNavList",
  // data:    Data created and maintained by this component.
  //          This function is like a constructor. It gets called
  //          separately for each instance of this component
  data: function(){
    return {}
  },

  // props:   Data passed into the component via attributes.
  //          Props can be optional or required. Objects and arrays
  //          are pass-by-reference. Primitives (number, string, boolean)
  //          are pass-by-value.
  props: {
    pages: {
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
        <q-btn flat  href="Clusters.html">
          <q-icon right size="2em">
            <i class="fa-solid fa-meteor grad"></i>
          </q-icon>
          Cluster
        </q-btn>

      </q-toolbar-title>

      <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
    </q-toolbar>
  </q-header>

</template>

<style scoped>

</style>