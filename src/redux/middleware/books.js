import {GetBooksAction, SetBooks} from "../actions/books";

/**
 * Middleware function
 */
export default function booksMiddleware() {
    return store => next => action => {
        switch (action.type) {
            case GetBooksAction:
                store.getState().stomp.stomp.sendMessage('/books');
        }

        next({
            type: action.type,
            payload: action.payload
        })
    }
}