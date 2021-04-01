import BaseAction from "../helpers/BaseAction";

export const SetStompAction = "SetStompAction";

export class SetStomp extends BaseAction {
    constructor(payload) {
        super(SetStompAction, payload);
    }
}