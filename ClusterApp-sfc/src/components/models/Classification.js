export default class Classification {
    id;
    name;
    constructor(name) {
        this.name = name ?? '';
    }

    toFirestore() {
        let name = this.name;

        return {name};
    }
    static fromFirestore(snapshot, options) {
        const data = snapshot.data(options);

        const classification = new Classification(data.name);
        classification.id = snapshot.id || 0;

        return classification;
    }
}