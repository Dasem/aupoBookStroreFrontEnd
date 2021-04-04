import BaseAction from "../helpers/BaseAction";

export const SendOrderAction = "SendOrderAction";
export const GetOrdersAction = "GetOrdersAction";
export const SetOrdersAction = "SetOrdersAction";
export const DeleteOrderAction = "DeleteOrderAction";

export class SendOrder extends BaseAction {
    constructor(payload) {
        super(SendOrderAction, payload);
    }
}

export class GetOrders extends BaseAction {
    constructor(payload = {}) {
        super(GetOrdersAction, payload);
    }
}

export class SetOrders extends BaseAction {
    constructor(payload) {
        super(SetOrdersAction, payload);
    }
}

export class DeleteOrder extends BaseAction {
    constructor(payload) {
        super(DeleteOrderAction, payload);
    }
}