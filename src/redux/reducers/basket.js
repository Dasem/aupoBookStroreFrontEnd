import {SetBasketAction} from "../actions/basket";

/**
 * initial state of the book list
 * @type {{basket: []}}
 */
const initialState = {
    basket: []
}

/**
 * The reducer function
 * @param state
 * @param action
 */
export default function (state = initialState, action) {
    switch (action.type) {
        case SetBasketAction: return {
            ...state,
            basket: action.payload
        }
        default:
            return state;
    }
}


