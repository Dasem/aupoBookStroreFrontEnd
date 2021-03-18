import {combineReducers} from 'redux';

// import partial reducers
import books from "./books";
import basket from "./basket";
import orders from "./orders";

/**
 * Combine and return all reducers to store
 */
export default combineReducers({
    // list of reducers
    books,
    basket,
    orders,
});