export default function  Clust (name,description,isPublic, favorite, classifications, type, Stars,  complete)
{
    this.name = name ?? '';
    this.description = description ?? '';
    this.isPublic = isPublic ?? false;
    this.favorite = favorite ?? false;
    this.classifications = classifications ?? [];
    this.type = type ?? '';
    this.Stars = Stars ?? [];
    this.complete = complete ?? false;

    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

// This arrangement can be altered based on how we want the date's format to appear.
    let currentDate = `${month}-${day}-${year}`

    this.creationDate = currentDate

};