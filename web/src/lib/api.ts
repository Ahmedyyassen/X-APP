import type { AxiosInstance } from "axios";
import type { CHECK_OTP_FORM, FORGET_PASSWORD_FORM, LOGIN_FORM, REGISTER_FORM, RESET_PASSWORD_FORM, VERIFY_FORM } from "../types/auth";
import { AUTH_ROUTES, CONV_ROUTES, USER_ROUTES } from "../constants/env";

export const authApi = {
    register: (api: AxiosInstance, data:REGISTER_FORM)=> api.post(AUTH_ROUTES.REGISTER, data),
    login: (api: AxiosInstance, data:LOGIN_FORM)=> api.post(AUTH_ROUTES.LOGIN, data),
    logout: (api:AxiosInstance)=> api.post(AUTH_ROUTES.LOGOUT),
    verifyAccount: (api: AxiosInstance, data:VERIFY_FORM) => api.post(AUTH_ROUTES.VERIFY_ACCOUNT, data),
    forgetPassword: (api:AxiosInstance, data: FORGET_PASSWORD_FORM)=> api.post(AUTH_ROUTES.FORGET_PASSWORD, data),
    checkPasswordOTP: (api: AxiosInstance, data:CHECK_OTP_FORM) => api.post(AUTH_ROUTES.CHECK_OTP, data),
    resetPassword: (api: AxiosInstance, data: RESET_PASSWORD_FORM) => api.post(AUTH_ROUTES.RESET_PASSWORD, data),
}

export const userApi = {
    syncUser: (api:AxiosInstance)=> api.get(USER_ROUTES.SYNC),
    getCurrentUser: (api: AxiosInstance) => api.get(USER_ROUTES.ME),
    getUserById: (api:AxiosInstance, id:string)=> api.get(USER_ROUTES.USER_BY_ID(id)),
    getUserByUsername: (api:AxiosInstance, username:string)=> api.get(USER_ROUTES.USER_BY_USERNAME(username)),
    followUser: (api:AxiosInstance, targetUserId:string)=> api.post(USER_ROUTES.FOLLOW_USER(targetUserId)),
    updateUser: (api:AxiosInstance, data:FormData)=> api.put(USER_ROUTES.UPDATE_PROFILE, data),
    getFriends: (api: AxiosInstance)=> api.get(USER_ROUTES.FRIENDS),
}

export const postApi= {
    createPost: (api: AxiosInstance, data: { content:string, image?: string }) =>
    api.post("/posts", data),
    likePost: (api: AxiosInstance, postId: string) => api.post(`/posts/${postId}/like`),
    deletePost: (api: AxiosInstance, postId: string) => api.delete(`/posts/${postId}`),
    getUserPosts: (api: AxiosInstance, username: string,page=1, limit=10) =>
        api.get(`/posts/user/${username}`, { params : { page, limit }}),
    getPosts: (api: AxiosInstance, page=1, limit=10) => api.get("/posts", {
        params: { page, limit }
    }),
    updatePost: (api:AxiosInstance, postId:string ,date:FormData)=> api.put(`/posts/${postId}`, date)
}

export const commentApi = {
    createComment: (api: AxiosInstance, postId: string, content: string)=>
        api.post(`/comments/post/${postId}`, { content }),
    deleteComment: (api: AxiosInstance, commentId: string )=>
        api.delete(`/comments/${commentId}`)
}

export const notificationApi = {
    getNotifications: (api: AxiosInstance)=> api.get("/notifications"),
    deleteNotification: (api: AxiosInstance, notificationId: string )=>
        api.delete(`/notifications/${notificationId}`)
}

export const conversationApi = {
    getConversation: (api:AxiosInstance)=> api.get(CONV_ROUTES.GET_CONV),
}