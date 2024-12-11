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
    buttonColor;
    password;
    buttonTextColor;
    //TODO: might add a font as well

    constructor(name, email, profileURL, backgroundUrl, siteColor, textColor ,cardColor,cardTextColor,buttonColor,buttonTextColor,password) {
        this.displayName = name ?? '';
        this.email = email ?? '';
        this.profileURL = profileURL ?? '';
        this.backgroundUrl = backgroundUrl ?? '';
        this.siteColor = siteColor ?? '';
        this.textColor = textColor ?? '';
        this.password = password ?? '';
        this.cardColor = cardColor ?? '';
        this.cardTextColor = cardTextColor ?? '';
        this.buttonColor = buttonColor ?? '';
        this.buttonTextColor = buttonTextColor ?? '';

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
        let buttonColor = this.buttonColor
        let buttonTextColor = this.buttonTextColor


        return {displayName, email, profileURL, backgroundUrl, siteColor,textColor,cardColor,cardTextColor,buttonColor,buttonTextColor};
    }

    //TODO: ask  tyler about this method  // P delete
    static fromFirestore(snapshot, options) {
        const data = snapshot.data(options);

        const user = new User(data.displayName, data.email, data.profileURL, data.backgroundUrl, data.siteColor,data.textColor,data.cardColor, data.cardTextColor,data.buttonColor,data.buttonTextColor);
        user.id = snapshot.id || 0;

        return user;
    }
}
