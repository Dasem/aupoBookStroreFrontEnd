import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import {createLogger} from "redux-logger";
import reducers from "./reducers/reducers"

import booksMiddleware from "./middleware/books"
import ordersMiddleware from "./middleware/orders";

/**
 * To initialize the store
 * @returns {Store<unknown, AnyAction> & Store<S, A> & {dispatch: Dispatch<A>}}
 */
export default function configureStore() {
    // define middleware
    const logger = createLogger();

    // create middleware
    const middleware = applyMiddleware(...[
        thunk,
        booksMiddleware(),
        ordersMiddleware(),
    ]);

    // create a new store and return it
    // store.dispatch();
    return createStore(reducers, {}, middleware);
}