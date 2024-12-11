export default class User {
    id;
    displayName;
    email;
    profileURL;
    backgroundUrl;
    siteColor;
    textColor;
    cardColor;
    cardTextColor;
    password;
    //TODO: might add a font as well

    constructor(name, email, profileURL, backgroundUrl, siteColor, textColor ,cardColor,cardTextColor,password) {
        this.displayName = name ?? '';
        this.email = email ?? '';
        this.profileURL = profileURL ?? '';
        this.backgroundUrl = backgroundUrl ?? '';
        this.siteColor = siteColor ?? '';
        this.textColor = textColor ?? '';
        this.password = password ?? '';
        this.cardColor = cardColor ?? '';
        this.cardTextColor = cardTextColor ?? '';

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
        let textColor = this.textColor;
        let cardColor = this.cardColor;
        let cardTextColor = this.cardTextColor;


        return {displayName, email, profileURL, backgroundUrl, siteColor,textColor,cardColor,cardTextColor};
    }

    //TODO: ask  tyler about this method  // P delete
    static fromFirestore(snapshot, options) {
        const data = snapshot.data(options);

        const user = new User(data.displayName, data.email, data.profileURL, data.backgroundUrl, data.siteColor,data.textColor,data.cardColor, data.cardTextColor);
        user.id = snapshot.id || 0;

        return user;
    }
}
