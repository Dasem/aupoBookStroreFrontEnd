import {GetOrdersAction, SendOrderAction, SetOrders} from "../actions/orders";
import {authHeader} from "../../components/consts/auth-header";

/**
 * Middleware function
 */
export default function ordersMiddleware() {
    return store => next => action => {
        switch (action.type) {
            case GetOrdersAction:
                fetch("http://localhost:8080/orders", {
             //       mode: 'no-cors',
                    headers: {
                        ...authHeader(),
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }).then(
                    response => response.json()
                ).then(
                    response => store.dispatch(new SetOrders(response))
                )
                break;
            case SendOrderAction:
                fetch("http://localhost:8080/order", {
                    method: 'post',
                    headers: {
                        ...authHeader(),
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(action.payload),
                }).then(response => {
                    // do nothing
                })
        }

        next({
            type: action.type,
            payload: action.payload
        })
    }
}