/**
 * initial state of the book list
 * @type {{users: []}}
 */
import {SetUsersAction} from "../actions/user";

const initialState = {
    users: []
}

/**
 * The reducer function
 * @param state
 * @param action
 */
export default function (state = initialState, action) {
    switch (action.type) {
        case SetUsersAction: return {
            ...state,
            users: action.payload
        }
        default:
            return state;
    }
}


