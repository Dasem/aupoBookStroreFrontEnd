import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import {createLogger} from "redux-logger";
import reducers from "./reducers/reducers"

import stompMiddleware from "./middleware/stomp";
import {ConnectStomp} from "./actions/stomp";
import {extractLogin} from "../components/consts/auth";

/**
 * To initialize the store
 * @returns {Store<unknown, AnyAction> & Store<S, A> & {dispatch: Dispatch<A>}}
 */
export default function configureStore() {
    // define logger
    const logger = createLogger();

    // create middleware
    const middleware = applyMiddleware(...[
        thunk,
        stompMiddleware(),
    ]);

    let store = createStore(reducers, {}, middleware);
    let userLogin = extractLogin();
    if (userLogin) {
        store.dispatch(new ConnectStomp(`/bookstore-${userLogin}`)); // Всё ок, хз чё он подчёркивает
    } else {
        store.dispatch(new ConnectStomp("/bookstore")); // Всё ок, хз чё он подчёркивает
    }
    return store;
}