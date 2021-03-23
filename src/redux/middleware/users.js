import {GetUsersAction, SetUsers} from "../actions/user";
import {authHeader} from "../../components/consts/auth-header";

/**
 * Middleware function
 */
export default function usersMiddleware() {
    return store => next => action => {
        switch (action.type) {
            case GetUsersAction:
                fetch("http://localhost:8080/users", {
             //       mode: 'no-cors',
                    headers: {
                        ...authHeader(),
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }).then(
                    response => response.json()
                ).then(
                    response => store.dispatch(new SetUsers(response))
                )
                break;
        }

        next({
            type: action.type,
            payload: action.payload
        })
    }
}