import {db, userStorage} from '@/firebase';
import {collection, doc, getDoc, onSnapshot, setDoc, updateDoc} from "firebase/firestore";
import User from '@/components/models/User.js';
import Cluster from "@/components/models/Clust.js";
import Star from "@/components/models/Star.js";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";



export default class UserCollection {
    static COLLECTION_NAME = 'ClusterUsers';
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
    /**
     * @param {User} user
     */
    static async updateUser(user){
                       debugger
        console.log(user)
        if (user.backgroundUrl && user.backgroundUrl[0] && user.backgroundUrl[0]?.name?.endsWith('.jpg')|| user.backgroundUrl[0]?.name?.endsWith('.jpeg') || user.backgroundUrl[0]?.name?.endsWith('.png')|| user.backgroundUrl[0]?.name?.endsWith('.gif') || user.backgroundUrl[0]?.name?.endsWith('.webp')) {
            UserCollection.addImage(user)
        }
        const userDoc =  UserCollection.getUserDoc(user.id)
        return updateDoc(userDoc,user.toFirestore())
            .catch(error => console.log(error))
    }
    /**
     * @param {User} user
     */
    static  addImage(user) {
        // docId and image file are required
        debugger
        if (!user.id || !user.backgroundUrl) {
            return false;
        }

        debugger
        // create a filename we know will be unique
        // the other option would be to create a folder for each recipe
        //let theRecipe = this.newRecipe;
        let allowedTypes = ['jpg', 'jpeg', 'png', 'gif', 'webp']
        console.log(user.backgroundUrl[0].name)
        let extension = user.backgroundUrl[0].name.toLowerCase().split('.').pop() ///check this

        // validate extension
        if (allowedTypes.indexOf(extension) < 0) {
            // invalid extension

            // let the user know...
            // TODO: let the user know WITHOUT alerts
            alert('Invalid file type.');

            return false;
        }
// todo: maybe remove size limit
        /*        // validate size (less than 200KB
                if (user.backgroundUrl[0].size > (200 * 1024)) {
                    // file too large

                    // let the user know...
                    // TODO: let the user know WITHOUT alerts
                    alert('File too large. 200KB max');

                    return false;
                }*/

        // TODO: add image to firebase
        const bgImage = ref(userStorage, user.id);
        uploadBytes(bgImage, user.backgroundUrl[0])
            .then(snapshot => {
                // clear the form
                //  this.newRecipe.image = null;

                // get the URL to the image we just uploaded
                return getDownloadURL(snapshot.ref);
            })
            .then(url => {
                // update the recipe
                console.log(url)
                const userDoc = UserCollection.getUserDoc(user.id);
                return updateDoc(userDoc, {backgroundUrl: url});
            })
            .then(docRef => {
                console.log("star updated with image");
            })
            .catch(error => {
                console.error('error uploading image', error);
            })
    }
}