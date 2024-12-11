import Star from "@/components/models/Star.js";
import Classification from "@/components/models/Classification.js";

export default class Cluster {
    id;
    name;
    description;
    isPublic;
    favorite;
    creationDate;
    displayURL = [];
    classifications = [];
    stars = [];
    searchTerms = [];

// TODO: add search term array


    constructor(name,description,isPublic, favorite) {
        this.name = name ?? '';
        this.description = description ?? '';
        this.isPublic = isPublic ?? false;
        this.favorite = favorite ?? false;
        this.creationDate =  this.getCurrentDate();

    }

    getCurrentDate(){

        const date = new Date();

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        return `${month}-${day}-${year}`;

    }

    addStar(star = new Star()){
        this.stars.push(star);
        return this;
    }
    addClassification(classification = new Classification()){
        this.classifications.push(classification);

        return this;
    }


    toFirestore() {
        let name = this.name;
        let description = this.description;
        let isPublic = this.isPublic; 
        let favorite = this.favorite; 
        let creationDate =  this.creationDate;
        let searchTerms = this.name.toLowerCase().split(" ")
        searchTerms.push(name)
        

        return {name, description, isPublic, favorite, creationDate,searchTerms};
    }

    static fromFirestore(snapshot, options) {
        const data = snapshot.data(options);

        const cluster = new Cluster (data.name, data.description, data.isPublic, data.favorite, data.creationDate,data.searchTerms);
        cluster.id = snapshot.id || 0;

        return cluster;
    }
};