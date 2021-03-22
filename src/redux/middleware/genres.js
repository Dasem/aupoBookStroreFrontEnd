import {GetGenresAction, SetGenres} from "../actions/genres";
import {authHeader} from "../../components/consts/auth-header";

/**
 * Middleware function
 */
export default function genresMiddleware() {
    return store => next => action => {
        switch (action.type) {
            case GetGenresAction:
                fetch("http://localhost:8080/genres", {
            //        mode: 'no-cors',
                    headers: {
                        ...authHeader(),
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }).then(
                    response => response.json()
                ).then(
                    response => store.dispatch(new SetGenres(response))
                )
                break;
        }

        next({
            type: action.type,
            payload: action.payload
        })
    }
}