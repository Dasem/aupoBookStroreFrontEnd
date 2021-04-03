import {GetBooksAction, SetBooks} from "../actions/books";
import * as Stomp from '@stomp/stompjs';
import * as Socket from 'sockjs-client';
import {ConnectStompAction} from "../actions/stomp";
import {GetGenresAction, SetGenres} from "../actions/genres";
import {authHeader} from "../../components/consts/auth-header";
import {SignUp, SignUpAction, SignInAction, SignIn} from "../actions/authorisation";
import {SetRole} from "../actions/role";
import {useHistory} from "react-router";
import {AUTH_COMPLETED_URL} from "../../components/consts/urls";
import {GetOrdersAction, SetOrders} from "../actions/orders";

/**
 * Middleware function
 */

let wsServerUrl = 'http://localhost:8080/bs';

let socket = new Socket(wsServerUrl);
export let client;

export default function stompMiddleware() {

    return store => next => action => {

        const stompFailure = error => {
            console.log(`Stomp failure: ${error}`);
            setTimeout(stompConnect, 3000);
        }

        const stompOnClose = () => {
            setTimeout(() => {
                socket = new Socket(wsServerUrl);
                stompConnect();
            }, 3000);
        }

        const stompConnect = () => {
            client = Stomp.Stomp.over(socket);
            client.connect({}, frame => {
                    client.subscribe("/bookstore", (message) => {
                        let data = JSON.parse(message.body);
                        // todo: если статус код 3xx - 4xx : страничку с ошибкой
                        switch (data.requestType) {
                            case "GET_BOOKS":
                                store.dispatch(new SetBooks(data.content));
                                break;

                            case "GET_GENRES":
                                store.dispatch(new SetGenres(data.content));
                                break;

                            case "GET_ORDERS":
                                store.dispatch(new SetOrders(data.content));
                                break;
                            case "CREATE_ORDER":


                            case "SIGN_IN":
                                // todo: обработать ситуацию с некорректной авторизацией
                                localStorage.setItem("user", JSON.stringify(data.content));
                                alert("Авторизация прошла успешно!");
                                // todo: рабочий редирект на стартовую страницу (q) history.push(AUTH_COMPLETED_URL);
                                break;
                            case "SIGN_UP":
                                // todo: обработать ситуацию с некорректной регистрацией
                                // todo: автоматический вход после успешной регистрации
                                alert("Регистрация прошла успешно!");
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
                client.send(`/books`, authHeader());
                break;
            case GetGenresAction:
                client.send(`/genres`, authHeader());
                break;
            case GetOrdersAction:
                client.send(`/orders`, authHeader());
                break;
            case SignInAction:
                client.send(`/signin`, {}, action.payload);
                break;
            case SignUpAction:
                client.send(`/signup`, {}, action.payload);
                break;
            default:
                // do nothing
        }
        next(action)
    }
}