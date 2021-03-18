/**
 * initial state of the book list
 * @type {{orders: []}}
 */
import {SendOrderAction} from "../actions/order";

const initialState = {
    orders: []
}

/**
 * The reducer function
 * @param state
 * @param action
 */
export default function (state = initialState, action) {
    switch (action.type) {
        case SendOrderAction: return {
            ...state,
            books: action.payload
        }
        default:
            return state;
    }
}


