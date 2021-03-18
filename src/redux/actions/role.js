import BaseAction from "../helpers/BaseAction";

export const GetRoleAction = "GetRoleAction";
export const SetRoleAction = "SetRoleAction";

export class GetRole extends BaseAction {
    constructor(payload) {
        super(GetRoleAction, payload);
    }
}

export class SetRole extends BaseAction {
    constructor(payload) {
        super(SetRoleAction, payload);
    }
}
