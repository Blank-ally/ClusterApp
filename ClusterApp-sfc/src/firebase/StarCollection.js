//TODO: Refactor file
import {collection, doc, getDoc, getDocs, addDoc, deleteDoc, onSnapshot, setDoc, query, where, orderBy} from "firebase/firestore";

import UserCollection from "@/firebase/UserCollection.js";
import DayCollection from "@/firebase/DayCollection.js";

import User from "@/models/User.js";
import Day from "@/models/Day.js";
import Meal from "@/models/Meal.js";

export default class MealCollection {
    static COLLECTION_NAME = 'meals';
    /**
     * One time call to get an array of meals
     * @param {User} user
     * @param {Date} date
     * @returns {Promise<*>}
     */
    static async getMeals(user, date) {
        const mealsCollection = MealCollection.getMealsCollection(user, date);
        const docsSnap = await getDocs(mealsCollection.withConverter(Meal));
        return docsSnap.docs.map(docRef => docRef.data());
    }

    /**
     * Sync provided meals array with database collection
     * @param {User} user
     * @param {Date} date
     * @param {Meal[]} meals
     */
    static syncMeals(user, date, meals) {
        const mealsCollection = MealCollection.getMealsCollection(user, date);
        const mealsQuery = query(
            mealsCollection,
            orderBy('time')
        ).withConverter(Meal);
        onSnapshot(mealsQuery, snapshot => {
                meals.splice(0, meals.length);
                snapshot.forEach(doc => {
                    meals.push(doc.data());
                })
            }
        )
    }

    /**
     * @param {User} user
     * @param {Date} date
     * @param {Meal} meal
     */
    static async deleteMeal(user, date, meal) {
        const mealDoc = MealCollection.getMealDoc(user, date, meal);
        return deleteDoc(mealDoc);
    }

    /**
     *
     * @param {User} user
     * @param {Date} date
     * @param {Meal} meal
     */
    static async setMeal(user, date, meal) {
        const mealDoc = MealCollection.getMealDoc(user, date, meal);
        return setDoc(mealDoc, meal.toFirestore());
    }

    /**
     *
     * @param {User} user
     * @param {Date} date
     */
    static getMealsCollection(user, date) {
        const dayDocRef = DayCollection.getDayDoc(user, date);
        return collection(dayDocRef, MealCollection.COLLECTION_NAME);
    }

    /**
     *
     * @param {User} user
     * @param {Date} date
     * @param {Meal} meal
     */
    static getMealDoc(user, date, meal) {
        const mealsCollection = MealCollection.getMealsCollection(user, date);
        return doc(mealsCollection, meal.id);
    }

    /**
     * @param {User} user
     * @param {Date} date
     * @param {Meal} meal
     */
    static async addMeal(user, date, meal) {
        const mealsCollection = MealCollection.getMealsCollection(user, date);
        return addDoc(mealsCollection, meal.toFirestore())
    }
}

