import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import {createLogger} from "redux-logger";
import reducers from "./reducers/reducers"

import ordersMiddleware from "./middleware/orders";
import roleMiddleware from "./middleware/role";
import authorisationMiddleware from "./middleware/authorisation";
import genresMiddleware from "./middleware/genres";
import usersMiddleware from "./middleware/users";
import stompMiddleware from "./middleware/stomp";
import {ConnectStomp} from "./actions/stomp";

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
        ordersMiddleware(),
        roleMiddleware(),
        authorisationMiddleware(),
        genresMiddleware(),
        usersMiddleware(),
        ordersMiddleware(),
        stompMiddleware(),
    ]);

    // create a new store and return it
    // store.dispatch();
    let store = createStore(reducers, {}, middleware);
    store.dispatch(new ConnectStomp()); // Всё ок, хз чё он подчёркивает
    return store;
}