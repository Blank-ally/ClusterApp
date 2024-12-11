<script >
import {onAuthStateChanged} from "firebase/auth";

import LNavList from "@/components/LNavList.vue"
import _ from "lodash"
import ClassificationList from "@/components/ClassificationList.vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import ClusterList from "@/components/ClusterList.vue";
import User from '@/components/models/User.js'
import {auth} from "@/firebase/index.js";
import UserCollection from "@/firebase/UserCollection.js";

 export default{ components: {
     ClusterList,
     FontAwesomeIcon,
     ClassificationList,
     LNavList

   },
    data: function() {
    return {

      authUser: new User(),

    }
  },

   created() {


     onAuthStateChanged(auth , firebaseUser => {
       if(firebaseUser){
         console.log('logged in')
         UserCollection.getUser(firebaseUser.uid)
             .then(dbUser => {
               if (dbUser && dbUser.exists()) {
                 // we have an existing user
                 return dbUser;
               } else {
                 // create new user
                 const newUser = new User(firebaseUser.displayName, firebaseUser.email);
                 newUser.id = firebaseUser.uid;

                 console.log('Creating new user.', newUser);
                 return UserCollection.setUser(newUser);
               }
             })
             .then(() => {
               UserCollection.syncUser(firebaseUser.uid, this.authUser);
             })
         // .catch(error => Notification.error('Error with login.', {firebaseUser, error}));
       }else{
         console.log('logged out')
         this.authUser = new User();
       }
     })

   },

}
</script>

<template>
  <div :style="{color: authUser.textColor, 'background-image': 'url(' + authUser.backgroundUrl +')', 'background-repeat': 'no-repeat','background-size': 'cover' }">


    <q-layout view="hHh lpR fFf">
    <l-nav-list :auth-user="authUser" ></l-nav-list>
      <q-page-container>
        <router-view :key="authUser.id" :auth-user="authUser"></router-view>

      </q-page-container>


    </q-layout>

  </div>
</template>

<style scoped>
body{
  background-image: url("assets/pexels-daniel-cid-634838605-17809424.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  color: #BF877A;
}
</style>

