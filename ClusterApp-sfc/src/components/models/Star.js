export default class Star {
    id;
    name;
    photoURL;
    cluster;
    classification;
    notes;

    constructor(name,photoURL,cluster,classification, qty, notes) {

        this.name = name ?? '';
        this.photoURL = photoURL ?? '';
        this.cluster = cluster ?? '';
        this.classification = classification ?? '';
        this.qty = qty ?? 0;
        this.notes = notes ?? '';

    }
    toFirestore() {
        let name = this.name;
        let photoURL = this.photoURL;
        let cluster = this.cluster;
        let classification = this.classification;
        let qty = this.qty;
        let notes = this.notes;

        return {name, photoURL,cluster, classification, qty, notes}; //
    }

    static fromFirestore(snapshot, options) {
        const data = snapshot.data(options);

        const star = new Star (data.name, data.photoURL, data.cluster, data.classification, data.qty, data.notes);
        star.id = snapshot.id || 0;

        return star;
    }

}