import {collection, doc, getDoc, getDocs, addDoc, deleteDoc, onSnapshot, setDoc, query, where, orderBy,updateDoc} from "firebase/firestore";

import UserCollection from "@/firebase/UserCollection.js";
//import StarCollection from "@/firebase/StarCollection.js";

import User from "@/components/models/User.js";
import Cluster from "@/components/models/Clust.js";
import Star from "@/components/models/Star.js";

export default class ClusterCollection {
    static COLLECTION_NAME = 'Clusters';

    /**
     * One time call to get an array of Clusters
     * @param {User} user
     * @returns {Promise<*>}
     */
    static async getClusters(user) {
        const clusterCollection = ClusterCollection.getClusterCollection(user);
        const docsSnap = await getDocs(clusterCollection.withConverter(Cluster));
        return docsSnap.docs.map(docRef => docRef.data());
    }

    /**
     * Sync provided Clusters array with database collection
     * @param {User} user
     * @param {Cluster[]} clusters
     */
    static syncClusters(user,clusters) {
        const clusterCollection = ClusterCollection.getClusterCollection(user);
        const ClustersQuery = query(
            clusterCollection
        ).withConverter(Cluster);
        onSnapshot(ClustersQuery, snapshot => {
                clusters.splice(0, clusters.length);
                snapshot.forEach(doc => {
                    clusters.push(doc.data());
                })
            }
        )
    }

    /**
     * @param {User} user
     * @param {Cluster} cluster

     */
    static async deleteCluster(user,cluster ) {
        const clusterDoc = ClusterCollection.getClusterDoc(user, cluster);
        return deleteDoc(clusterDoc);
    }

    /**
     * @param {User} user
     * @param {Cluster} cluster

     */
    static async updateCluster(user,cluster ) {
        const clusterDoc = ClusterCollection.getClusterDoc(user, cluster);
        return updateDoc(clusterDoc,cluster.toFirestore());
    }

    /**
     *
     * @param {User} user
     * @param {Cluster} cluster

     */
    static async setCluster(user, cluster) {
        const clusterDoc = ClusterCollection.getClusterDoc(user, cluster);
        return setDoc(clusterDoc, cluster.toFirestore());
    }

    /**
     *
     * @param {User} user
     */
    static getClusterCollection(user) {
        const userDocRef = UserCollection.getUserDoc(user.id);
        console.log(userDocRef)
        return collection(userDocRef, ClusterCollection.COLLECTION_NAME);
    }

    /**
     *
     * @param {User} user
     * @param {Cluster} cluster
     */
    static getClusterDoc(user, cluster) {
        const clustersCollection = ClusterCollection.getClusterCollection(user);
        return doc(clustersCollection, cluster.id);
    }
    /**
     *
     * @param {User} user
     * @param {String} clusterId
     */
    static async getCluster(user, clusterId){
        console.log(clusterId)
        const ClusterRef = ClusterCollection.getClusterDocById(user,clusterId )
        console.log(` user ${user} , cLusterId  ${clusterId}, refs ${ClusterRef}`)
        const docSnap = await getDoc(ClusterRef.withConverter(Cluster));
        return docSnap.data();

    }
    /**
     *
     * @param {User} user
     * @param {String} clusterId
     */

    static  getClusterDocById(user, clusterId)
    {  console.log(user,clusterId)
        const clustersCollection = ClusterCollection.getClusterCollection(user);
        return doc(clustersCollection, clusterId);
    }


    /**
     * @param {User} user
     * @param {Cluster} cluster
     */
    static async addCluster(user, cluster) {
        const clustersCollection = ClusterCollection.getClusterCollection(user);
        console.log(clustersCollection)
        return addDoc(clustersCollection, cluster.toFirestore())
    }
    ///add search terms
    /**
     * @param {User} user
     * @param {String} searchTerm
     * @param {Cluster[]} clusters
     */
    static searchCluster(user,searchTerm,clusters){
        const clusterCollection = ClusterCollection.getClusterCollection(user);
        debugger
        const  clusterQuery = (searchTerm == "" ) ? ClusterCollection.syncClusters(user,clusters) : query(clusterCollection,
            where('searchTerms', 'array-contains',searchTerm)
        ).withConverter(Cluster);
        clusters.splice(0, clusters.length);
        onSnapshot(clusterQuery, snapshot => {
            snapshot.forEach(doc => {
                clusters.push(doc.data());

            })
        })

    }
}