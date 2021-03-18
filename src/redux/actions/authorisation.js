import BaseAction from "../helpers/BaseAction";

export const TryToLoginAction = "TryToLoginAction";
export const RegisterAction = "RegisterAction";

export class TryToLogin extends BaseAction {
    constructor(payload = {}) {
        super(TryToLoginAction, payload);
    }
}

export class Register extends BaseAction {
    constructor(payload = {}) {
        super(RegisterAction, payload);
    }
}