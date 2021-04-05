import BaseAction from "../helpers/BaseAction";

export const CreateOrderAction = "CreateOrderAction";
export const SendUserOrderAction = "SendUserOrderAction";
export const GetOrdersAction = "GetOrdersAction";
export const SetOrdersAction = "SetOrdersAction";
export const DeleteOrderAction = "DeleteOrderAction";

export class SendUserOrder extends BaseAction {
    constructor(payload) {
        super(SendUserOrderAction, payload);
    }
}

export class CreateOrder extends BaseAction {
    constructor(payload) {
        super(CreateOrderAction, payload);
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