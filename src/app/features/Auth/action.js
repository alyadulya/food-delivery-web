import { USER_LOGIN, USER_LOGOUT } from "./constant"

export const userLogin = (payload) => ({
    type : USER_LOGIN,
    payload
});

export const userLogout = (payload) => ({
    type : USER_LOGOUT
});