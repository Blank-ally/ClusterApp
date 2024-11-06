<script>
import router from "@/router/index.js";

export default {
  name: "StarItem",
  data: function(){
    return {

      editStar:{...this.star},currentStar:{...this.star}
    }
  },
  props: {

    star:{
      type: Object,
      required: true
    }
  },
  methods: {
    SetCurrentStar(){
      debugger

      this.currentStar = this.star;
      this.editStar = this.currentStar
      window.location.href = router() //TODO: figure out page routing
    },


  },
  computed: {

  },
  mounted: function () {
// this could also be done in the crated block as well
    if(localStorage.getItem('editStar')){
      this.editStar = JSON.parse(localStorage.getItem('editStar'))
    }
    if(localStorage.getItem('currentStar')){
      this.currentStar = JSON.parse(localStorage.getItem('currentStar'))
    }
  },
  watch: {
    editStar:{
      //this.shoppingList // = old list before the list is updated
      handler(){
        localStorage.setItem('editStar',JSON.stringify(this.editStar))
      },
      deep: true,

    },     currentStar:{
      //this.shoppingList // = old list before the list is updated
      handler(){
        localStorage.setItem('currentStar',JSON.stringify(this.currentStar))
      },
      deep: true,

    }
  }
}
</script>

<template>
  <q-card class="my-card cursor-pointer" @click="SetCurrentStar()">
    <img :src="star.photo">

    <q-card-section>
      <div class="text-h6">
        {{star.name}}
      </div>
    </q-card-section>

  </q-card>

</template>

<style scoped>

</style>