import {db} from '@/firebase';
import {collection, doc, getDoc, onSnapshot, setDoc} from "firebase/firestore";
import User from '@/components/models/User.js';
import Cluster from "@/components/models/Clust.js";
import Star from "@/components/models/Star.js";



export default class UserCollection {
    static COLLECTION_NAME = 'countItUsers';
    /**
     * @param {string} uid
     */
    static async getUser(uid){
        const userDocRef = UserCollection.getUserDoc(uid);
        const userDocSnap = await getDoc(userDocRef.withConverter(User))
        return userDocSnap.data();
    }

    static syncUser(uid, user){
        const userDocRef = UserCollection.getUserDoc(uid);
        onSnapshot(userDocRef.withConverter(User), doc => {
            Object.assign(user, doc.data());

        });
    }

    /**
     * @param {User} user
     */
    static async setUser(user){
        const userDocRef = UserCollection.getUserDoc(user.id);
        return setDoc(userDocRef, user.toFirestore());
    }

    /**
     * @param {string} uid
     */
    static getUserDoc(uid){
        return doc(UserCollection.getUsersCollection(), uid);
    }

    static getUsersCollection(){
        return collection(db, UserCollection.COLLECTION_NAME);
    }
}
