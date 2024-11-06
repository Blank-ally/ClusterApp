<script>
export default {
  name: "ClassificationItem",
  data: function(){
    return {}
  },

  // props:   Data passed into the component via attributes.
  //          Props can be optional or required. Objects and arrays
  //          are pass-by-reference. Primitives (number, string, boolean)
  //          are pass-by-value.
  props: {
    clas:{
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

  },
}
</script>

<template>
  <q-item>
    <q-item-section>
      <q-item-label>{{clas.name}}</q-item-label>
    </q-item-section>
    <!--
        <q-item-section top side>
                            <div class="text-grey-8 q-gutter-xs">
                                <q-btn class="gt-xs" size="12px" flat dense round icon="delete" @click="$emit('delclas',clas)"></q-btn>
                                <q-btn class="gt-xs" size="12px" flat dense round icon="done" ></q-btn>
                                <q-btn size="12px" flat dense round icon="more_vert"></q-btn>
                            </div>
        </q-item-section>-->

<!--    TODO: COnfigure edit and delete for classi-->
  </q-item>
</template>

<style scoped>

</style>