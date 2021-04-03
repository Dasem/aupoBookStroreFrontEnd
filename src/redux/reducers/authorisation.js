import {ANONYMOUS} from "../../components/consts/role";
import {SignInAction} from "../actions/authorisation";

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
        case SignInAction: return {
            ...state,
            role: action.payload
        }
        default:
            return state;
    }
}


