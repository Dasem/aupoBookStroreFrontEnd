import BaseAction from "../helpers/BaseAction";

/**
 * List of actions
 * @type {string}
 */
export const GetGenresAction = "GetGenresAction";
export const SetGenresAction = "SetGenresAction";

/**
 * GetGenres action class
 */
export class GetGenres extends BaseAction {
    constructor(payload = {}) {
        super(GetGenresAction, payload);
    }
}

/**
 * SetGenres action class
 */
export class SetGenres extends BaseAction {
    constructor(payload) {
        super(SetGenresAction, payload);
    }
}