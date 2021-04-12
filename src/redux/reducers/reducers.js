import {combineReducers} from 'redux';

// import partial reducers
import books from "./books";
import basket from "./basket";
import authorisation from "./authorisation";
import genres from "./genres";
import orders from "./orders";
import users from "./users";

/**
 * Combine and return all reducers to store
 */
export default combineReducers({
    // list of reducers
    books,
    basket,
    authorisation,
    genres,
    orders,
    users,
});