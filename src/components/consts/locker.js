import {WS_TIMEOUT} from "./utils";
import {Spinner} from "reactstrap";
import * as ReactDOM from "react-dom";
import {useState} from "react";
import {GrClose, MdDone} from "react-icons/all";

const SPINNER_EL = (
    <Spinner style={{width:"100px", height:"100px"}} color="primary"/>
)

const DONE = (
    <MdDone size={100} color={"green"}/>
)

const REJECTED = (
    <GrClose size={100} color={"red"}/>
)

const EMPTY = (
    <div></div>
)

// ReactDOM.render(element, document.getElementById('root'));

/**
 * Если зачем-то тебе нужно знать, как это работает: это кастомный мьютекс
 *
 * В callback'е находится инфа о том. что нужно выполнить по окончанию работы WS.
 * Если нужно ещё где-то заюзать, делай по образу и подобию уже существующего.
 */
export class Locker {
    constructor() {
        this.holder = {};
        this.timeoutForWsResponse = null;
    }

    get callback() {
        return this.holder.cb;
    }

    showLoading = () => {
        ReactDOM.render(SPINNER_EL, document.getElementById('spinner'));
    }

    hideLoading = (success) => { // если успешно - галочка, если нет - крестик
        if (success) {
            ReactDOM.render(DONE, document.getElementById('spinner'));
        } else {
            ReactDOM.render(REJECTED, document.getElementById('spinner'));
        }
        setTimeout(() => ReactDOM.render(EMPTY, document.getElementById('spinner')), 1000)
    }

    receiveOperation = (payload) => {
        if (this.holder.cb) {
            // Отключаем сброс коллбека по таймауту, т.к. достучались до сервера
            if (this.timeoutForWsResponse) {
                clearTimeout(this.timeoutForWsResponse);
            }
            this.holder.cb(payload);
        } else {
            alert('Callback function invalid state!')
        }
        this.holder.cb = null;
        this.hideLoading(true);
    }

    // Ожидаем ответа от сервера и выполняем действие. Возможно не дождёмся
    waitForResponse = (cb) => {
        this.showLoading();
        this.holder.cb = cb;
        this.timeoutForWsResponse = setTimeout(() => {
            this.holder.cb = null;
            this.hideLoading(false);
            //alert('Too long response, request refused');
        }, WS_TIMEOUT)
    }
}