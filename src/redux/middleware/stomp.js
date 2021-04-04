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
import {DeleteOrderAction, GetOrdersAction, SendOrderAction, SetOrders} from "../actions/orders";
import {receiveOrderOperation} from "../../components/admin/orders";
import {GetUsersAction, SetUsers} from "../actions/user";

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
                    client.subscribe("/user/bookstore", (message) => {
                        let data = JSON.parse(message.body);
                        // todo: если статус код 3xx - 4xx : страничку с ошибкой
                        if (data.status < 200 || data.status >= 300) {
                            alert(`Ошибка: ${data.customError}`);
                            return;
                        }
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

                            case "GET_USERS":
                                store.dispatch(new SetUsers(data.content));
                                break;
                            case "CREATE_ORDER":
                                receiveOrderOperation(data.content);
                                break;
                            case "DELETE_ORDER":
                                receiveOrderOperation();
                                break;

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

        // todo: перенесены на WS не все действия, скореев сего и не будут все, потому что мне надоело
        const doAction = () => {
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

                case GetUsersAction:
                    client.send(`/admin/users`, authHeader());
                    break;
                case SendOrderAction:
                    client.send(`/admin/order`, authHeader(), JSON.stringify(action.payload));
                    break;
                case DeleteOrderAction:
                    client.send(`/admin/order/${action.payload}`, authHeader());
                    break;

                case SignInAction:
                    client.send(`/signin`, {}, JSON.stringify(action.payload));
                    break;
                case SignUpAction:
                    client.send(`/signup`, {}, JSON.stringify(action.payload));
                    break;
                default:
                // do nothing
            }
            next(action)
        }

        // todo: просто временное решение на ещё одну попытку коннекта, в идеале это сделать луше, но мне влом
        // лечит падение при обновлении страницы с данными: сокет ещё не успел законнектиться, но его юзаем
        if (action.type !== ConnectStompAction && !client.connected) {
            setTimeout(doAction, 1000);
        } else {
            doAction();
        }
    }
}