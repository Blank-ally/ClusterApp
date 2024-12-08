<script>
import ClusterList from "@/components/ClusterList.vue";
import ClusterItem from "@/components/ClusterItem.vue";
import LSearch from "@/components/LSearch.vue";
import User from "@/components/models/User.js";
import {db,auth, authProvider} from "@/firebase/index.js";
import UserCollection from "@/firebase/UserCollection.js";
import {onAuthStateChanged,createUserWithEmailAndPassword, signInWithPopup, signOut,signInWithEmailAndPassword} from "firebase/auth";
import {computed} from "vue";
import router from "@/router/index.js";




export default {
  name: "HomeView",
  components: {ClusterItem, LSearch,ClusterList,User,db},
  props: {
    list:{
      type: Array,
      required: true
    },
    authUser: {type: User, required: true},

  },
  provide() {
    return {
      authUser: computed(() => this.authUser),
      login: this.login,
      logout: this.logout,
    }
  },
  methods: {

  loginWithGoogle() {
      signInWithPopup(auth,authProvider).then(()=> router.push('/ClusterCollection')) // .then not required in case of wanting to  do  more with  tokens
         .catch(error => console.log('Login error! '+ error)) // my code will not hava notification  model unless i make one
    },
    logout() {
    //TODO: move to Nav bar
      signOut(auth).then(()=> router.push('/'))
          .catch(error => console.log(' Logout error! '+ error))
    },

    CreateWithUser(email, password){
    debugger
      createUserWithEmailAndPassword(auth, email, password)
          .then(()=> router.push('/Settings'))
          .catch(function(error) {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log(`${errorMessage} ${errorCode}`);
          });
      this.authUser.displayName = '';

    },
    SignInWithUsers(email, password){
      signInWithEmailAndPassword(auth, email, password)
          .then(() => console.log("Logged in idk why theres two "))
          .then(() => router.push({name: 'ClusterCollection'}))
          .catch(function(error) {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log(`${errorMessage} ${errorCode}`);
          });
    }
  },
}

</script>

<template>

  <q-card class="q-pa-md shadow-2 my_card" bordered>
    <q-card-section class="text-center">
      <div class="text-grey-9 text-h5 text-weight-bold">Sign in</div>
      <div class="text-grey-8">Sign in below to access your account</div>
    </q-card-section>
    <q-card-section>
      <q-input dense outlined v-model="authUser.email" label="Email Address"></q-input>
      <q-input dense outlined class="q-mt-md"  v-model="authUser.password" type="password" label="Password"></q-input>
    </q-card-section>
    <q-card-section>
      <q-btn style="
  border-radius: 8px;" color="dark" rounded size="md" label="Sign up" no-caps class="full-width" @click="CreateWithUser(authUser.email,authUser.password)"></q-btn>
      <q-btn style="border-radius: 8px;" color="dark" rounded size="md" label="Sign in" no-caps class="full-width" @click="SignInWithUsers(authUser.email,authUser.password)"></q-btn>
    </q-card-section>
    <q-card-section class="text-center q-pt-none">
      <div class="text-grey-8">Don't have an account yet?
        <a href="#" class="text-dark text-weight-bold" style="text-decoration: none">Sign
          up.</a></div>
    </q-card-section>

  </q-card>





</template>


