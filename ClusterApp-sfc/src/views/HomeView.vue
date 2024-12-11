<script>
import { useQuasar } from 'quasar'
import ClusterList from "@/components/ClusterList.vue";
import ClusterItem from "@/components/ClusterItem.vue";
import LSearch from "@/components/LSearch.vue";
import User from "@/components/models/User.js";
import {db,auth, authProvider} from "@/firebase/index.js";
import UserCollection from "@/firebase/UserCollection.js";
import {onAuthStateChanged,createUserWithEmailAndPassword, signInWithPopup, signOut,signInWithEmailAndPassword} from "firebase/auth";
import {computed, ref} from "vue";
import router from "@/router/index.js";
import SignInWithGoogleButton from "@/components/SignInWithGoogleButton.vue";

export default {
  name: "HomeView",

  data: function () {
    return {
      dense: ref(false),
      errorMsg: "",
      showName: false


    }
  },
  components: {ClusterItem, LSearch,ClusterList,User,db,SignInWithGoogleButton},
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
      signInWithPopup(auth,authProvider).then(()=> {
        this.errorMsg = '';
        this.authUser.password = ''
        router.push('/ClusterCollection')}) // .then not required in case of wanting to  do  more with  tokens
          .catch(error => console.log('Login error! '+ error)) // my code will not hava notification  model unless i make one
    },


    CreateWithUser(){
      debugger
      createUserWithEmailAndPassword(auth,this.authUser.email, this.authUser.password)
          .then(() => {UserCollection.updateUser(this.authUser)
            this.errorMsg =''}
          )
          .then(()=> router.push('/ClusterCollection'))
          .catch(error => {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log(`${errorMessage} ${errorCode}`);
            this.errorMsg = "! The email entered is already in use please sign in or try other credentials"
            this.authUser.password = ''
          });
      // this.authUser.displayName = '';

    },
    SignInWithUsers(){
      debugger
      signInWithEmailAndPassword(auth, this.authUser.email, this.authUser.password)
          .then(() => {console.log("Logged in idk why theres two ")
            this.errorMsg = "";
            this.authUser.password = ''

          })
          .then(() => router.push({name: 'ClusterCollection'}))
          .catch(error =>  {

            let errorCode = error.code;
            let errorMessage = error.message;
            this.errorMsg = `! The login credentials entered  are not valid`
            this.authUser.password = ''


            console.log(`${errorMessage} ${errorCode} `);



          });
    },

    transitionForm(){
      document.querySelector('.cont').classList.toggle('s-signup')
      this.errorMsg =''
      this.authUser.email = '';
      this.authUser.password = ''
      this.authUser.displayName = ''
    }
  },
}

</script>

<template>


  <div class="q-pa-xl row justify-center ">

    <div class="cont">
      <div class="form sign-in">
        <q-form
            ref="signInForm"
            @submit="SignInWithUsers"

        >
          <h2>Sign In</h2>
          <p style="color: darkred; text-align: center;" >{{errorMsg}}</p>


          <q-input  type="email"  v-model="authUser.email" label="Email Address" :dense="dense"
                    reactive-rules
                    :rules="[(val) => !!val || 'Email required!' ,
                    (val, rules) => rules.email(val) || 'Please enter a valid email address']"
          ></q-input>

          <q-input :dense="dense"
                   class="q-mt-md"
                   v-model="authUser.password"
                   type="password"
                   label="Password"
                   reactive-rules
                   :rules="[((val) => !!val || 'Please enter a password'), (val => !(val.length < 8) || 'Please type at least 8 characters') ]"

          ></q-input>

          <q-btn label="Sign In"   type="submit"  class="submit" ></q-btn>



          <q-btn  @click="loginWithGoogle" >
            <sign-in-with-google-button :dense="!showName"/>
          </q-btn>
        </q-form>
      </div>



      <div class="sub-cont">
        <div class="img">
          <div class="img-text m-up">

            <h2>New here?</h2>
            <p>Sign up and discover great amount of new opportunities!</p>
          </div>
          <div class="img-text m-in">
            <h2>One of us?</h2>
            <p>If you already has an account, just sign in. We've missed you!</p>
          </div>
          <div @click="transitionForm" class="img-btn">
            <span class="m-up">Sign Up</span>
            <span class="m-in">Sign In</span>
          </div>
        </div>
        <div class="form sign-up">
          <q-form
              @submit="CreateWithUser"
          >
            <h2>Sign Up</h2>
            <p style="color: darkred; text-align: center;" >{{errorMsg}}</p>
            <q-input  v-model="authUser.displayName" label="UserName" :dense="dense"
                      reactive-rules
                      :rules="[ val => val && val.length > 0 || 'Please type something']"
            ></q-input>
            <q-input  type="email"  v-model="authUser.email" label="Email Address" :dense="dense"
                      reactive-rules
                      :rules="[(val) => !!val || 'Email required!' ,
                    (val, rules) => rules.email(val) || 'Please enter a valid email address']"
            ></q-input>
            <q-input :dense="dense" class="q-mt-md"  v-model="authUser.password" type="password" label="Password"
                     reactive-rules
                     :rules="[((val) => !!val || 'Please enter a password'), (val => !(val.length < 8) || 'Please type at least 8 characters') ]"></q-input>

            <q-btn   type="submit"  class="submit">Sign Up Now</q-btn>
          </q-form>
        </div>
      </div>
    </div>


  </div>




</template>


<style scoped>
*, *:before, *:after{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Nunito', sans-serif;
}



input, button{
  border:none;
  outline: none;
  background: none;
}

.cont{
  overflow: hidden;
  position: relative;
  width: 900px;
  height: 550px;
  background: #fff;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.30), 0 15px 12px rgba(0, 0, 0, 0.22);
}

.form{
  position: relative;
  width: 640px;
  height: 100%;
  padding: 50px 30px;
  -webkit-transition:-webkit-transform 1.2s ease-in-out;
  transition: -webkit-transform 1.2s ease-in-out;
  transition: transform 1.2s ease-in-out;
  transition: transform 1.2s ease-in-out, -webkit-transform 1.2s ease-in-out;
}

h2{
  width: 100%;
  font-size: 30px;
  text-align: center;
}

label{
  display: block;
  width: 260px;
  margin: 25px auto 0;
  text-align: center;
}


button{
  display: block;
  margin: 0 auto;
  width: 260px;
  height: 36px;
  border-radius: 30px;
  color: #fff;
  font-size: 15px;
  cursor: pointer;
}

.submit{
  margin-top: 40px;
  margin-bottom: 30px;
  text-transform: uppercase;
  font-weight: 600;
  font-family: 'Nunito', sans-serif;
  background-image: url(../assets/pexels-adrien-olichon-1257089-2538107.jpg);
  background-size: contain;

}

.submit:hover{
  background: -webkit-linear-gradient(left, #ff670e, #ff1a0e);
}

.forgot-pass{
  margin-top: 15px;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: #0c0101;
  cursor: pointer;
}

.forgot-pass:hover{
  color: red;
}

.social-media{
  width: 100%;
  text-align: center;
  margin-top: 20px;
}

.social-media ul{
  list-style: none;
}

.social-media ul li{
  display: inline-block;
  cursor: pointer;
  margin: 25px 15px;
}

.social-media img{
  width: 40px;
  height: 40px;
}

.sub-cont{
  overflow: hidden;
  position: absolute;
  left: 640px;
  top: 0;
  width: 900px;
  height: 100%;
  padding-left: 260px;
  background: #fff;
  -webkit-transition: -webkit-transform 1.2s ease-in-out;
  transition: -webkit-transform 1.2s ease-in-out;
  transition: transform 1.2s ease-in-out;
}

.cont.s-signup .sub-cont{
  -webkit-transform:translate3d(-640px, 0, 0);
  transform:translate3d(-640px, 0, 0);
}

.img{
  overflow: hidden;
  z-index: 2;
  position: absolute;
  left: 0;
  top: 0;
  width: 260px;
  height: 100%;
  padding-top: 360px;
}

.img:before{
  content: '';
  position: absolute;
  right: 0;
  top: 0;
  width: 900px;
  height: 100%;
  background-image: url(../assets/signInFormPhoto.jpg);
  background-size: cover;
  transition: -webkit-transform 1.2s ease-in-out;
  transition: transform 1.2s ease-in-out, -webkit-transform 1.2s ease-in-out;
}

.img:after{
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.3);
}

.cont.s-signup .img:before{
  -webkit-transform:translate3d(640px, 0, 0);
  transform:translate3d(640px, 0, 0);
}

.img-text{
  z-index: 2;
  position: absolute;
  left: 0;
  top: 50px;
  width: 100%;
  padding: 0 20px;
  text-align: center;
  color: #fff;
  -webkit-transition:-webkit-transform 1.2s ease-in-out;
  transition: -webkit-transform 1.2s ease-in-out;
  transition: transform 1.2s ease-in-out, -webkit-transform 1.2s ease-in-out;
}

.img-text h2{
  margin-bottom: 10px;
  font-weight: normal;
}

.img-text p{
  font-size: 14px;
  line-height: 1.5;
}

.cont.s-signup .img-text.m-up{
  -webkit-transform:translateX(520px);
  transform:translateX(520px);
}

.img-text.m-in{
  -webkit-transform:translateX(-520px);
  transform:translateX(-520px);
}

.cont.s-signup .img-text.m-in{
  -webkit-transform:translateX(0);
  transform:translateX(0);
}


.sign-in{
  padding-top: 65px;
  -webkit-transition-timing-function:ease-out;
  transition-timing-function:ease-out;
}

.cont.s-signup .sign-in{
  -webkit-transition-timing-function:ease-in-out;
  transition-timing-function:ease-in-out;
  -webkit-transition-duration:1.2s;
  transition-duration:1.2s;
  -webkit-transform:translate3d(640px, 0, 0);
  transform:translate3d(640px, 0, 0);
}

.img-btn{
  overflow: hidden;
  z-index: 2;
  position: relative;
  width: 100px;
  height: 36px;
  margin: 0 auto;
  background: transparent;
  color: #fff;
  text-transform: uppercase;
  font-size: 15px;
  cursor: pointer;
}

.img-btn:after{
  content: '';
  z-index: 2;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border: 2px solid #fff;
  border-radius: 30px;
}

.img-btn span{
  position: absolute;
  left: 0;
  top: 0;
  display: -webkit-box;
  display: flex;
  -webkit-box-pack:center;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  -webkit-transition:-webkit-transform 1.2s;
  transition: -webkit-transform 1.2s;
  transition: transform 1.2s;
  transition: transform 1.2s, -webkit-transform 1.2s;;
}

.img-btn span.m-in{
  -webkit-transform:translateY(-72px);
  transform:translateY(-72px);
}

.cont.s-signup .img-btn span.m-in{
  -webkit-transform:translateY(0);
  transform:translateY(0);
}

.cont.s-signup .img-btn span.m-up{
  -webkit-transform:translateY(72px);
  transform:translateY(72px);
}

.sign-up{
  -webkit-transform:translate3d(-900px, 0, 0);
  transform:translate3d(-900px, 0, 0);
}

.cont.s-signup .sign-up{
  -webkit-transform:translate3d(0, 0, 0);
  transform:translate3d(0, 0, 0);
}

</style>