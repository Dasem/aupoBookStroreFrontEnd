import {combineReducers} from 'redux';

// import partial reducers
import books from "./books";
import basket from "./basket";
import role from "./role";
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
    role,
    authorisation,
    genres,
    orders,
    users,
});