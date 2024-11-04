export default function Star (name,photo,cluster, classi, qty, notes, trade ){

    this.name = name ?? '';
    this.photo = photo ?? '';
    this.cluster = cluster ?? '';
    this.classi = classi ?? '';
    this.qty = qty ?? 0;
    this.notes = notes ?? '';
    this.trade = trade ?? false;
}