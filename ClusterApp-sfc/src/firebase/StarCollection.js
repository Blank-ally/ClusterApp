import {collection, doc, getDoc, getDocs, addDoc, deleteDoc, onSnapshot, setDoc, query, where, orderBy,starStorage } from "firebase/firestore";
import ClusterCollection from "@/firebase/ClusterCollection.js";
import Star from "@/components/models/Star.js";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";

export default class StarCollection {
    static COLLECTION_NAME = 'Stars';
    /**
     * One time call to get an array of meals
     * @param {User} user
     * @param {Cluster} cluster
     * @returns {Promise<*>}
     */
    static async getStars(user, cluster) {
        const starsCollection = StarCollection.getStarsCollection(user, cluster);
        const docsSnap = await getDocs(starsCollection.withConverter(Star));
        return docsSnap.docs.map(docRef => docRef.data());
    }

    /**
     * Sync provided meals array with database collection
     * @param {User} user
     * @param {Cluster} cluster
     * @param {Star[]} stars
     */
    static syncStars(user, cluster, stars) {
        const starsCollection = StarCollection.getStarsCollection(user, cluster);
        const starsQuery = query(
            starsCollection,
        ).withConverter(Star);
        onSnapshot(starsQuery, snapshot => {
                stars.splice(0, stars.length);
                snapshot.forEach(doc => {
                    stars.push(doc.data());
                })
            }
        )
    }

    /**
     * @param {User} user
     * @param {Cluster} cluster
     * @param {Star} star
     */
    static async deleteStar(user, cluster, star) {
        const starDoc = StarCollection.getStarDoc(user, cluster, star);
        return deleteDoc(starDoc);
    }

    /**
     *
     * @param {User} user
     * @param {Cluster} cluster
     * @param {Star} star
     */
    static async setStar(user, cluster, star) {
        const starDoc = StarCollection.getStarDoc(user, cluster, star);
        return setDoc(starDoc, star.toFirestore());
    }

    /**
     *
     * @param {User} user
     * @param {Cluster} cluster
     */
    static getStarsCollection(user, cluster) {
        const clusterDocRef = ClusterCollection.getClusterDoc(user, cluster);
        return collection(clusterDocRef, StarCollection.COLLECTION_NAME);
    }

    /**
     *
     * @param {User} user
     * @param {Cluster} cluster
     * @param {Star} Star
     */
    static getStarDoc(user, cluster, Star) {
        const starsCollection = StarCollection.getStarsCollection(user, cluster);
        return doc(StarCollection, Star.id);
    }

    /**
     * @param {User} user
     * @param {Cluster} cluster
     * @param {Star} star
     */
    static async addStar(user, cluster, star) {
        const starsCollection = StarCollection.getStarsCollection(user, cluster);
        return addDoc(starsCollection, star.toFirestore())
            .then((docRef) =>
                this.addImage(docRef.id)

            );
    }
    /**
     *
     * @param {String} StarId
     * @param {Star} star
     */
    static  addImage(StarId,star) {
    // docId and image file are required
    if (!star.id || !star.photoURL) {
        return false;
    }
 debugger
    // create a filename we know will be unique
    // the other option would be to create a folder for each recipe
    //let theRecipe = this.newRecipe;
    let allowedTypes = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    let extension = star.photoURL.name.toLowerCase().split('.').pop() ///check this

    // validate extension
    if (allowedTypes.indexOf(extension) < 0) {
        // invalid extension

        // let the user know...
        // TODO: let the user know WITHOUT alerts
        alert('Invalid file type.');

        return false;
    }
// todo: maybe remove size limit
    // validate size (less than 200KB
    if (star.photoURL.size > (200 * 1024)) {
        // file too large

        // let the user know...
        // TODO: let the user know WITHOUT alerts
        alert('File too large. 200KB max');

        return false;
    }

    // TODO: add image to firebase
    const starImage = ref(starStorage, Star.id);
    uploadBytes(starImage, star.photoURL)
        .then(snapshot => {
            // clear the form
          //  this.newRecipe.image = null;

            // get the URL to the image we just uploaded
            return getDownloadURL(snapshot.ref);
        })
        .then(url => {
            // update the recipe

            const starDoc = StarCollection.getStarDoc(user, cluster, star);
            return updateDoc(recipeDoc, {image: url});
        })
        .then(docRef => {
            console.log("recipe updated with image");
        })
        .catch(error => {
            console.error('error uploading image', error);
        })
}
}


