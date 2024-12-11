<script>
import router from "@/router/index.js";
import Star from "@/components/models/Star.js";
import User from "@/components/models/User.js";

export default {
  name: "StarItem",
  data: function(){
    return {

      editStar:{...this.star},currentStar:{...this.star}
    }
  },
  props: {

    star:{
      type: Star,
      required: true
    },
    clusterId: {
      type: String,
      required: true,
    },
    authUser: {type: User, required: true},
  },
  methods: {
    SetCurrentStar(){

      this.currentStar = this.star;
      this.editStar = this.currentStar

      this.$router.push({name:"EditStar", params:{clusterId:this.clusterId,starId: this.star.id}})

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
  <q-card :style="{color:authUser?.cardTextColor || black, background: authUser?.cardColor || white }" class="card  cursor-pointer" @click="SetCurrentStar()">
    <q-img :src="star.photoURL" style="max-width: 250px; max-height: 150px; width: 100%; height: 100%"></q-img>

    <q-card-section>
      <div class="text-h6">
        {{star.name}}
      </div>
    </q-card-section>

  </q-card>

</template>

<style scoped>
.card{
  max-height: 200px;
  max-width: 200px;
  overflow:hidden;
}
</style>