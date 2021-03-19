/**
 * initial state of the book list
 * @type {{orders: []}}
 */
import {SetRoleAction} from "../actions/role";
import {ANONYMOUS} from "../../components/consts/role";

const initialState = {
    role: ANONYMOUS
}

/**
 * The reducer function
 * @param state
 * @param action
 */
export default function (state = initialState, action) {
    switch (action.type) {
        case SetRoleAction: return {
            ...state,
            role: action.payload
        }
        default:
            return state;
    }
}


