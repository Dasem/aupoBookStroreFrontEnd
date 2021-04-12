import BaseAction from "../helpers/BaseAction";

export const GetUsersAction = "GetUsersAction";
export const SetUsersAction = "SetUsersAction";
export const CreateUserAction = "CreateUserAction";
export const DeleteUserAction = "DeleteUserAction";

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

export class CreateUser extends BaseAction {
    constructor(payload) {
        super(CreateUserAction, payload);
    }
}

export class DeleteUser extends BaseAction {
    constructor(payload) {
        super(DeleteUserAction, payload);
    }
}