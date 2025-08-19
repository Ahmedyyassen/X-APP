import type { USER } from "./user";

export interface Comment {
    _id: string;
    content: string;
    createdAt: string;
    user: USER;
}

export interface Post {
    _id: string;
    content: string;
    image?: string;
    createdAt: string;
    user: USER;
    likes: string[];
    comments: Comment[];
}

export interface Notification {
    _id: string;
    from: {
        fullName: string;
        username:string;
        profilePicture?: string;
    };
    to: string;
    type: "like" | "comment" | "follow";
    post?: {
        _id: string;
        content: string;
        image?: string;
    };
    comment?:{
        _id: string;
        content: string;
    };
    createdAt: string
}
