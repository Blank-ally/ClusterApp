export default class User {
    id;
    displayName;
    email;
    profileURL;
    backgroundUrl;
    siteColor;
    password;
    //TODO: might add a font as well

    constructor(name, email, profileURL, backgroundUrl, siteColor,password) {
        this.displayName = name ?? '';
        this.email = email ?? '';
        this.profileURL = profileURL ?? '';
        this.backgroundUrl = backgroundUrl ?? '';
        this.siteColor = siteColor ?? '';
        this.password = password ?? '';

        return this;
    }
    exists(){
        return !!this.id;
    }

    toFirestore() {
        let displayName = this.displayName;
        let email = this.email;
        let profileURL = this.profileURL;
        let backgroundUrl = this.backgroundUrl;
        let siteColor = this.siteColor;


        return {displayName, email, profileURL, backgroundUrl, siteColor};
    }

    //TODO: ask  tyler about this method  // P delete
    static fromFirestore(snapshot, options) {
        const data = snapshot.data(options);

        const user = new User(data.displayName, data.email, data.profileURL, data.backgroundUrl, data.siteColor);
        user.id = snapshot.id || 0;

        return user;
    }
}