import BaseAction from "../helpers/BaseAction";

export const ConnectStompAction = "ConnectStompAction";

export class ConnectStomp extends BaseAction {
    constructor(payload = null) {
        super(ConnectStompAction, payload);
    }
}