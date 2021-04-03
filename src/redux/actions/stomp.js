import BaseAction from "../helpers/BaseAction";

export const SetStompAction = "SetStompAction";
export const ConnectStompAction = "ConnectStompAction";

export class SetStomp extends BaseAction {
    constructor(payload) {
        super(SetStompAction, payload);
    }
}

export class ConnectStomp extends BaseAction {
    constructor(payload = {}) {
        super(ConnectStompAction, payload);
    }
}