/**
 * Middleware function
 */
import {GetRoleAction, SetRole} from "../actions/role";

export default function roleMiddleware() {
    return store => next => action => {
        switch (action.type) {
            case GetRoleAction:
                fetch("http://localhost:8080/role", {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }).then(
                    response => response.json()
                ).then(
                    response => store.dispatch(new SetRole(response))
                )
                break;
        }

        next({
            type: action.type,
            payload: action.payload
        })
    }
}