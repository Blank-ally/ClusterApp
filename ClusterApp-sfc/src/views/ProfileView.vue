<script>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import User from "@/components/models/User.js";
import HomeView from "@/views/HomeView.vue";

export default {
  name: "Profile",
  components: {FontAwesomeIcon,HomeView},

  data: function(){
    return {
      slide:true,
    }
  },


  props: {

    authUser: {type: User, required: true},
  },

  // methods: Usually "events" triggered by v-on:
  methods: {

  },

  computed: {


  },
  mounted() {
    debugger
    if(!this.authUser?.id){
      router.push('/')
    }
  }
}

</script>

<template >
  <q-page  v-if="authUser?.exists()">
  <div class="q-pa-md">
      <q-carousel
          arrows
          animated
          v-model="slide"
          height="400px"
      >
        <q-carousel-slide name="first" img-src="https://cdn.quasar.dev/img/mountains.jpg">
          <div class="absolute-bottom custom-caption">
            <div class="text-h2">First stop</div>
            <div class="text-subtitle1">Mountains</div>
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="second" img-src="https://cdn.quasar.dev/img/parallax1.jpg">
          <div class="absolute-bottom custom-caption">
            <div class="text-h2">Second stop</div>
            <div class="text-subtitle1">Famous City</div>
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="third" img-src="https://cdn.quasar.dev/img/parallax2.jpg">
          <div class="absolute-bottom custom-caption">
            <div class="text-h2">Third stop</div>
            <div class="text-subtitle1">Famous Bridge</div>
          </div>
        </q-carousel-slide>
      </q-carousel>
    </div>

  <q-separator />
  </q-page>
  <home-view v-else :auth-user="authUser"/>

</template>

<style scoped>

</style>