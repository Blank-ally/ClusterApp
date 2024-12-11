<script>
import Classification from "@/components/models/Classification.js";
import ClassificationCollection from "@/firebase/ClassificationCollection.js";
import {colors} from "quasar";

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
      type: Classification,
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
    colors() {
      return colors
    }

  },
}
</script>

<template>
  <q-item>
    <q-item-section>
      <q-item-label style="color:black ">{{clas.name}}</q-item-label>
      <!--      <q-popup-edit v-model="clas.name" auto-save >
              <q-input v-model="clas.name" dense autofocus counter @keyup.enter="$emit('edit-classification',clas)" />
            </q-popup-edit>-->
    </q-item-section>

    <q-item-section top side>
      <div class="text-grey-8 q-gutter-xs">
        <q-btn size="12px" flat dense round icon="delete" @click="$emit('delete-classification',clas)"></q-btn>
        <!--                                <q-btn class="gt-xs" size="12px" flat dense round icon="fa-solid fa-pen-to-square"></q-btn>-->

      </div>
    </q-item-section>

  </q-item>
</template>

<style scoped>

</style>