import {SetGenresAction} from "../actions/genres";

/**
 * initial state of the book list
 * @type {{genres: []}}
 */
const initialState = {
    genres: []
}

/**
 * The reducer function
 * @param state
 * @param action
 */
export default function (state = initialState, action) {
    switch (action.type) {
        case SetGenresAction: return {
            ...state,
            genres: action.payload
        }
        default:
            return state;
    }
}


