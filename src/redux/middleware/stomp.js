import {GetBooksAction, SetBooks} from "../actions/books";
import * as Stomp from '@stomp/stompjs';
import * as Socket from 'sockjs-client';
import {ConnectStompAction} from "../actions/stomp";

/**
 * Middleware function
 */
export default function stompMiddleware() {

    var sServerUrl = 'http://localhost:8080/bs';

    var socket = new Socket(sServerUrl);
    var client;

    return store => next => action => {

        const stompFailure = error => {
            console.log(`Stomp failure: ${error}`);
            setTimeout(stompConnect, 3000);
        }

        const stompOnClose = () => {
            setTimeout(() => {
                socket = new Socket(sServerUrl);
                stompConnect();
            }, 3000);
        }

        const stompConnect = () => {
            client = Stomp.Stomp.over(socket);
            client.connect({}, frame => {
                    client.subscribe("/bookstore", (message) => {
                        let data = JSON.parse(message.body);
                        switch (data.requestType) {
                            case "GET_BOOKS":
                                store.dispatch(new SetBooks(data.content));
                                break;
                            default:
                                console.log(`Unknown requestType: ${data.requestType}`);
                        }
                    })
                },
                error => stompFailure(error),
                () => stompOnClose()
            );
        }

        switch (action.type) {
            case ConnectStompAction:
                stompConnect();
                break;
            case GetBooksAction:
                client.send(`/books`); // Было так, при необходимости разобраться чё это: "client.send(`/books`, {}, '');"
                break;
            default:
                // do nothing
        }
        next({
            type: action.type,
            payload: action.payload
        })
    }
}