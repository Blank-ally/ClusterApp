//TODO: refactor file

import {collection, doc, getDoc, getDocs, addDoc, deleteDoc, onSnapshot, setDoc, query, where, orderBy,updateDoc} from "firebase/firestore";
import ClusterCollection from "@/firebase/ClusterCollection.js";
import Classification from "@/components/models/Classification.js";

export default class ClassificationCollection {
    static COLLECTION_NAME = 'Classifications';
    /**
     * One time call to get an array of meals
     * @param {User} user
     * @param {Cluster} cluster
     * @returns {Promise<*>}
     */
    static async getClassifications(user, cluster) {
        const classificationsCollection = ClassificationCollection.getClassificationCollection(user, cluster);
        const docsSnap = await getDocs(classificationsCollection.withConverter(Classification));
        return docsSnap.docs.map(docRef => docRef.data());
    }

    /**
     * Sync provided meals array with database collection
     * @param {User} user
     * @param {Cluster} cluster
     * @param {Classification[]} classifications
     */
    static syncClassifications(user, cluster, classifications) {
        const classificationsCollection = ClassificationCollection.getClassificationCollection(user, cluster);
        const ClassificationsQuery = query(
            classificationsCollection,
        ).withConverter(Classification);
        onSnapshot(ClassificationsQuery, snapshot => {
            classifications.splice(0, classifications.length);
                snapshot.forEach(doc => {
                    classifications.push(doc.data());
                })
            }
        )
    }

    /**
     * @param {User} user
     * @param {Cluster} cluster
     * @param {Classification} classification
     */
    static async deleteClassification(user, cluster, classification) {
        const classificationDoc = ClassificationCollection.getClassificationDoc(user, cluster, classification);
        return deleteDoc(classificationDoc);
    }
    /**
     * @param {User} user
     * @param {Cluster} cluster
     * @param {Classification} classification
     */
    static async updateClassification(user, cluster, classification) {
        const classificationDoc = ClassificationCollection.getClassificationDoc(user, cluster, classification);
        return updateDoc(classificationDoc,classification.toFirestore());
    }
    /**
     *
     * @param {User} user
     * @param {Cluster} cluster
     * @param {Classification} classification
     */
    static async setClassification(user, cluster, classification) {
        const classificationDoc = ClassificationCollection.getClassificationDoc(user, cluster, classification);
        return setDoc(classificationDoc, classification.toFirestore());
    }

    /**
     *
     * @param {User} user
     * @param {Cluster} cluster
     */
    static getClassificationCollection(user, cluster) {
        const clusterDocRef = ClusterCollection.getClusterDoc(user,cluster);
        return collection(clusterDocRef, ClassificationCollection.COLLECTION_NAME);
    }

    /**
     *
     * @param {User} user
     * @param {Cluster} cluster
     * @param {Classification} classification
     */
    static getClassificationDoc(user, cluster, classification) {
        const classificationsCollection = ClassificationCollection.getClassificationCollection(user, cluster);
        return doc(classificationsCollection, classification.id);
    }

    /**
     * @param {User} user
     * @param {Cluster} cluster
     * @param {Classification} classification
     */
    static async addClassification(user, cluster, classification) {
        const classificationsCollection = ClassificationCollection.getClassificationCollection(user, cluster);
        return addDoc(classificationsCollection, classification.toFirestore())
    }
}

