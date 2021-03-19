import {SetRole} from "../actions/role";
import {TryToLoginAction} from "../actions/authorisation";

export default function authorisationMiddleware() {
    return store => next => action => {
        switch (action.type) {
            case TryToLoginAction:
                fetch("http://localhost:8080/login", {
                    method:'post',
             //       mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: action.payload,
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