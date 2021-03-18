import BaseAction from "../helpers/BaseAction";

export const SetBasketAction = "SetBasketAction";

export class SetBasket extends BaseAction {
    constructor(payload) {
        super(SetBasketAction, payload);
    }
}