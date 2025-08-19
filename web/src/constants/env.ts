export const SERVER_HOST = import.meta.env.MODE === "development" ? "http://localhost:3030" : ""

export const BASE_URL = `${SERVER_HOST}/api`;

export const AUTH_ROUTES = {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    VERIFY_ACCOUNT: "/auth/verifyAccount",
    FORGET_PASSWORD: "/auth/forgetPassword",
    CHECK_OTP: "/auth/check-forgetpassword-otp",
    RESET_PASSWORD: "/auth/resetpassword"
}

export const USER_ROUTES ={
    SYNC: "/users/sync",
    ME:"/users/me",
    USER_BY_ID:(id:string)=> `/users/${id}`,
    USER_BY_USERNAME: (username:string)=> `/users/username/${username}`,
    FOLLOW_USER:(id:string)=> `/users/follow/${id}`,
    UPDATE_PROFILE: "/users/profile",
    CHANGE_PASSWORD: "/users/profile/password",
    FRIENDS: "/users/friends/following"
}

export const CONV_ROUTES = {
    GET_CONV: "/conversations"
}