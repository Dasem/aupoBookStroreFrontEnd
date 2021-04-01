import {SetStompAction} from "../actions/stomp";

/**
 * initial state of the book list
 * @type {{stomp: null}}
 */
const initialState = {
    stomp: null
}

/**
 * The reducer function
 * @param state
 * @param action
 */
export default function (state = initialState, action) {
    switch (action.type) {
        case SetStompAction: return {
            ...state,
            stomp: action.payload
        }
        default:
            return state;
    }
}


