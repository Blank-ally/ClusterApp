import {
    collection,
    doc,
    getDoc,
    getDocs,
    addDoc,
    deleteDoc,
    onSnapshot,
    setDoc,
    query,
    where,
    orderBy,
    updateDoc,
    limit
} from "firebase/firestore";
import ClusterCollection from "@/firebase/ClusterCollection.js";
import Cluster from "@/components/models/Clust.js";
import Star from "@/components/models/Star.js";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {starStorage} from "@/firebase";


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
     * @param {Star[]} stars
     */
    static syncStarsWithImages(user, cluster, stars) {
        const starsCollection = StarCollection.getStarsCollection(user, cluster);
        const starsQuery = query(
            starsCollection,
            where('photoURL', '!=', '""'),
            limit(4)
        ).withConverter(Star);
        onSnapshot(starsQuery, snapshot => {
                stars.splice(0, stars.length);
                snapshot.forEach(doc => {
                    console.log(doc.data())
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

    static async updateStar(user, cluster, star) {
debugger
     if (star.photoURL &&
         star.photoURL[0]
         &&
         star.photoURL[0]?.name?.endsWith('.jpg')
         ||star.photoURL[0]?.name?.endsWith('.jpeg')
         || star.photoURL[0]?.name?.endsWith('.png')
         || star.photoURL[0]?.name?.endsWith('.gif')
         || star.photoURL[0]?.name?.endsWith('.webp')
     )
     {
          return StarCollection.addImage(user,cluster,star)
     }

        const starDoc = StarCollection.getStarDoc(user, cluster, star);
        return updateDoc(starDoc, star.toFirestore()).catch(error => console.log(error))


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
        return doc(starsCollection, Star.id);
    }

    /**
     * @param {User} user
     * @param {Cluster} cluster
     * @param {Star} star
     */
    static async addStar(user, cluster, star) {
        const starImg = star.photoURL
        star.photoURL = ''
        const starsCollection = StarCollection.getStarsCollection(user, cluster);
        return addDoc(starsCollection, star.toFirestore())
            .then((docRef) =>{
                star.id = docRef.id
                star.photoURL = starImg
                StarCollection.addImage(user,cluster,star)}

            );

    }

    /**
     *@param {User} user
     *@param {Cluster} cluster
     *@param {String} starId
     */
    static async getStar(user,cluster,starId ) {
        const starRef = StarCollection.getStarDocById(user,cluster,starId)
        const docSnap = await getDoc(starRef.withConverter(Star));
        return docSnap.data();

    }

    /**
     *@param {User} user
     *@param {Cluster} cluster
     *@param {String} starId
     */
    static getStarDocById(user,cluster,starId ){
        const starsCollection = StarCollection.getStarsCollection(user, cluster);
        return doc(starsCollection, starId);
    }
    /**
     *@param {User} user
     *@param {Cluster} cluster
     *@param {Star} star
     */
    static  addImage(user,cluster,star) {
        // docId and image file are required
        debugger
        if (!star.id || !star.photoURL) {
            return false;
        }

        debugger
        // create a filename we know will be unique
        // the other option would be to create a folder for each recipe
        //let theRecipe = this.newRecipe;
        let allowedTypes = ['jpg', 'jpeg', 'png', 'gif', 'webp']
        console.log(star.photoURL[0].name)
        let extension = star.photoURL[0].name.toLowerCase().split('.').pop() ///check this

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
        /*    if (star.photoURL[0].size > (200 * 1024)) {
                // file too large

                // let the user know...
                // TODO: let the user know WITHOUT alerts
                alert('File too large. 200KB max');

                return false;
            }*/

        // TODO: add image to firebase
        const starImage = ref(starStorage, star.id);
        uploadBytes(starImage, star.photoURL[0])
            .then(snapshot => {
                // clear the form
                //  this.newRecipe.image = null;

                // get the URL to the image we just uploaded
                return getDownloadURL(snapshot.ref);
            })
            .then(url => {
                // update the recipe
                const starDoc = StarCollection.getStarDoc(user, cluster, star);
                return updateDoc(starDoc, {photoURL: url});
            })

            .catch(error => {
                console.error('error uploading image', error);
            })
    }

}

