/**
 * Middleware function
 */
import {GetRoleAction, SetRole} from "../actions/role";
import {ANONYMOUS} from "../../components/consts/role";
import {authHeader} from "../../components/consts/auth-header";

export default function roleMiddleware() {
    return store => next => action => {
        switch (action.type) {
            case GetRoleAction:
                fetch("http://localhost:8080/role", {
                        headers: authHeader(),
                        method: "get",
                    }
                ).then(
                    response => response.json()
                ).then(
                    response => {
                        if (response === ANONYMOUS) {
                            localStorage.removeItem("user");
                        }
                        store.dispatch(new SetRole(response))
                    }
                )
                break;
        }

        next({
            type: action.type,
            payload: action.payload
        })
    }
}