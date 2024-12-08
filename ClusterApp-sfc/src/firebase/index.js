// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage, ref } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
    apiKey: "AIzaSyCVvD_jwZDgNrNmnf_shdfcBnBFvOEgPNM",
    authDomain: "classdb-f22b8.firebaseapp.com",
    projectId: "classdb-f22b8",
    storageBucket: "classdb-f22b8.firebasestorage.app",
    messagingSenderId: "302684605168",
    appId: "1:302684605168:web:4db501e769f065ba8c9035"
};


let app, db, auth, authProvider,storage,starStorage;
try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
    authProvider = new GoogleAuthProvider();
    storage = getStorage(app);
     starStorage = ref(storage, 'stars');
}catch(error){
    // do as set timeout because Quasar's Notify is not registered yet.
 //   setTimeout(() => Notification.error('Could not connect to database.', error), 1000);
}

export {db, auth, authProvider,starStorage};
