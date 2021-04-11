export const auth = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.accessToken) {
        return {Authorization: "Bearer " + user.accessToken};
    } else {
        return {};
    }
}

export const extractLogin = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.login) {
        return user.login;
    } else {
        return null;
    }
}