import BaseAction from "../helpers/BaseAction";

export const GetUsersAction = "GetUsersAction";
export const SetUsersAction = "SetUsersAction";

export class GetUsers extends BaseAction {
    constructor(payload) {
        super(GetUsersAction, payload);
    }
}

export class SetUsers extends BaseAction {
    constructor(payload) {
        super(SetUsersAction, payload);
    }
}