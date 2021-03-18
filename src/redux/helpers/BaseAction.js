class BaseAction {
    constructor(type, payload = {}) {
        this.type = type;
        this.payload = payload;
    }
}

export default BaseAction;