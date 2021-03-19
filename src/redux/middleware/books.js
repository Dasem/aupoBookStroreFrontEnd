import {GetBooksAction, SetBooks} from "../actions/books";

/**
 * Middleware function
 */
export default function booksMiddleware() {
    return store => next => action => {
        switch (action.type) {
            case GetBooksAction:
                fetch("http://localhost:8080/books", {
            //        mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }).then(
                    response => response.json()
                ).then(
                    response => store.dispatch(new SetBooks(response))
                )
                break;
        }

        next({
            type: action.type,
            payload: action.payload
        })
    }
}