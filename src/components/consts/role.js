export const ADMIN = 'ROLE_ADMIN';
export const USER = 'ROLE_USER';
export const ANONYMOUS = 'ROLE_ANONYMOUS';

export const getAuthorities = () => {
    if (!localStorage.getItem("user")) {
        return [ANONYMOUS];
    }
    return JSON.parse(localStorage.getItem("user")).roles
}