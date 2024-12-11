<script>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import User from "@/components/models/User.js";
import {signOut} from "firebase/auth";
import {auth} from "@/firebase/index.js";
import router from "@/router/index.js";

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

    authUser: {type: User, required: true},
  },

  // methods: Usually "events" triggered by v-on:
  methods: {

    toggleRightDrawer(){
      this.rightDrawerOpen = !this.rightDrawerOpen;
    },
    toProfile(){
      router.push({name: 'Profile'})
    },
    toSettings(){
      router.push({name:'Settings'})
    },
    logout() {
console.log('Logging out')
      signOut(auth).then(()=> router.push('/')).then(() => this.toggleRightDrawer())
          .catch(error => console.log(' Logout error! '+ error))
    },
  },


  computed: {


  }
}
</script>

<template>

  <q-header elevated v-if="authUser?.id" :style="{background: authUser.siteColor }" >
    <q-toolbar>
      <q-toolbar-title>
        <q-btn flat  @click="$router.push({name: 'ClusterCollection'})"  :list="list">  <!-- check if user is null if not display cluster collection-->
          <q-icon name="fa-solid fa-meteor" right size="2em"/>
          Cluster
        </q-btn>

      </q-toolbar-title>
      <q-btn dense flat round icon="fa-solid fa-bars" @click="toggleRightDrawer" />
    </q-toolbar>


  </q-header>

  <q-header class="bg-black" elevated v-else >
    <q-toolbar>
      <q-toolbar-title>
        <q-btn  flat to="/"  >
          <q-icon name="fa-solid fa-meteor grad" right size="2em"/>
          Cluster
        </q-btn><!-- check if user is null if not display cluster collection-->

      </q-toolbar-title>
<!--      <q-btn dense flat round icon="fa-solid fa-bars" @click="toggleRightDrawer" />-->
    </q-toolbar>


  </q-header>

  <q-drawer  v-model="rightDrawerOpen" side="right" bordered>
    <!-- drawer content -->
    <!--  TODO: customize this  -->
    <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
      <q-list padding>

<!--
        <q-item  clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="fa-solid fa-user"></q-icon>
          </q-item-section>
          <q-item-section>
          <q-btn  flat @click="toProfile">Profile</q-btn>
          </q-item-section>
        </q-item>
-->

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="fa-solid fa-gear " />
          </q-item-section>

          <q-item-section>
            <q-btn  flat @click="toSettings">Settings</q-btn>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="fa-solid fa-right-from-bracket fa-flip-horizontal"></q-icon>
          </q-item-section>

          <q-item-section>
            <q-btn  flat @click="logout">LogOut</q-btn>
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>

    <q-img class="absolute-top"  v-if="authUser.backgroundUrl" :src="authUser.backgroundUrl" style="height: 150px">
        <div class="absolute-bottom bg-transparent">
          <!--        <q-avatar size="56px" class="q-mb-sm">
          &lt;!&ndash;          <img :src="authUser.profileURL">&ndash;&gt;
                  </q-avatar>-->
          <div class="text-weight-bold">{{ authUser.displayName}}</div>
          <div>{{authUser.email}}</div>
        </div>
      </q-img>
      <q-img class="absolute-top" v-else  src="../assets/pexels-adrien-olichon-1257089-2538107.jpg" style="height: 150px">
      <div class="absolute-bottom bg-transparent">
<!--        <q-avatar size="56px" class="q-mb-sm">
&lt;!&ndash;          <img :src="authUser.profileURL">&ndash;&gt;
        </q-avatar>-->
      <div class="text-weight-bold">{{ authUser.displayName}}</div>
       <div>{{authUser.email}}</div>
      </div>
    </q-img>
  </q-drawer>
</template>

<style scoped>

</style>