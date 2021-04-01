export const api = (callback) => {
    if (callback) {
        return callback()
    }
}

export const routeStomp = (response, props) => {
    switch (response.requestType) {
        case "GET_BOOKS":
            props.setBooks(response.content);
    }
}