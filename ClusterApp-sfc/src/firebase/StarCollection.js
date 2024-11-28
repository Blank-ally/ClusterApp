import {collection, doc, getDoc, getDocs, addDoc, deleteDoc, onSnapshot, setDoc, query, where, orderBy} from "firebase/firestore";
import ClusterCollection from "@/firebase/ClusterCollection.js";
import Star from "@/components/models/Star.js";

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
    }
}

