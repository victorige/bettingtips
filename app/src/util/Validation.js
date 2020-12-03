export default class Validation {

    static email(emailAddress) {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return reg.test(emailAddress);
    }

    static password(pass) {
        return pass.length > 5;
    }
}