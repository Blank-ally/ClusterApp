import {onAuthStateChanged, signInWithPopup, signOut} from "firebase/auth";
import {auth, authProvider} from "@/firebase/index.js";
import UserCollection from "@/firebase/UserCollection.js";
import User from "@/components/models/User.js";

import {reactive} from "vue";

export default class Auth {
    static _instance;
    firebaseUser;
    user;

    /**
     * Singleton that provides access to the logged-in user.
     * The param should be created by the app/component to keep it reactive.
     * //@param {User} user The user object to hold the logged-in user.
     */
    // constructor(user) {
    constructor() {
        if (!Auth._instance) {
            // create a new instance of the class
            Auth._instance = this;

            // start session
            this.user = reactive(new User());
            this._startSession();
        }

        return Auth._instance;
    }

    login(){
        console.log('signing in 2')

        return signInWithPopup(auth, authProvider)
            .then(result => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                // const credential = GoogleAuthProvider.credentialFromResult(result);
                // const token = credential.accessToken;
                // The signed-in user info.
                // const user = result.user;
            }).catch(error =>
               // Notification.error('Login failed.', error)
                console.log('logout error ' + error)
            );
    }

    logout (){
        console.log('signing out 2')
        return signOut(auth)
            .catch(error =>
              console.log('logout error ' + error)

            );
    }

    _startSession(){
        onAuthStateChanged(auth, firebaseUser => {
            this.firebaseUser = firebaseUser;
            if (firebaseUser) {
                // logged in
                console.log('logged in');
                UserCollection.getUser(firebaseUser.uid)
                    .then(dbUser => {
                        if (dbUser && dbUser.exists()) {
                            // we have an existing user
                            return dbUser;
                        } else {
                            // create new user
                            const newUser = new User(firebaseUser.displayName, firebaseUser.email, firebaseUser.photoURL, 2000);
                            newUser.id = firebaseUser.uid;

                            console.log('Creating new user.', newUser);
                            return UserCollection.setUser(newUser);
                        }
                    })
                    .then(() => {
                        UserCollection.syncUser(firebaseUser.uid, this.user);
                    })
                    .catch(error => Notification.error('Error with login.', {firebaseUser, error}));
            } else {
                // logged out
                console.log('logged out');
                Object.assign(this.user, new User());
            }
        });
    }

    getUser(){
        return this.user;
    }
}
