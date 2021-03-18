import {GetOrdersAction, SendOrderAction, SetOrders} from "../actions/order";

/**
 * Middleware function
 */
export default function ordersMiddleware() {
    return store => next => action => {
        switch (action.type) {
            case GetOrdersAction:
                fetch("http://localhost:8080/orders", {
                    headers: {
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