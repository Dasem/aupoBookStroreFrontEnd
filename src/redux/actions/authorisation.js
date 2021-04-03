import BaseAction from "../helpers/BaseAction";

export const SignInAction = "SignInAction";
export const SignUpAction = "SignUpAction";

export class SignIn extends BaseAction {
    constructor(payload = {}) {
        super(SignInAction, payload);
    }
}

export class SignUp extends BaseAction {
    constructor(payload = {}) {
        super(SignUpAction, payload);
    }
}