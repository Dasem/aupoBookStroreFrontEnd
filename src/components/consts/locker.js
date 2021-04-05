import {WS_TIMEOUT} from "./utils";

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
    }

    // Ожидаем ответа от сервера и выполняем действие. Возможно не дождёмся
    waitForResponse = (cb) => {
        this.holder.cb = cb;
        this.timeoutForWsResponse = setTimeout(() => {
            this.holder.cb = null;
            alert('Too long response, request refused');
        }, WS_TIMEOUT)
    }
}