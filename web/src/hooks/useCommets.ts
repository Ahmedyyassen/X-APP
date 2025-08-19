import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import useApiClient from "./useApiClient";
import { commentApi } from "../lib/api";
import { query } from "../constants/queries";
import toast from "react-hot-toast";

type Props={
    postId: string;
    content: string;
}
const useCommets = (username?:string) => {
    
    const [commentText, setCommentText] = useState("")
    const api = useApiClient();
    const queryClient = useQueryClient();    

    const { mutate:createCommentMutation, isPending} = useMutation({
        mutationFn: async({postId, content}:Props)=> {
            const res = await commentApi.createComment(api, postId, content)
            return res.data;
        },
        onSuccess:()=>{
            setCommentText("");
            queryClient.invalidateQueries({queryKey: [query.POST]})
            if (username) {
                queryClient.invalidateQueries({queryKey: [query.USER_POSTS, username]})
            }
        },
        onError:(err)=>{
            toast.error(err.message)
        }
    })

    const createComment = (postId: string) => {
        if (!commentText.trim()) {
            toast.error("Please write something before posting!")
            return;
        }
        createCommentMutation({ postId, content:commentText.trim() })
    }

    const { mutate: deleteCommentMutation } = useMutation({
        mutationFn: async(commentId: string)=> await commentApi.deleteComment(api, commentId),
        onSuccess:()=> {
            queryClient.invalidateQueries({queryKey: [query.POST]})
             if (username) {
                queryClient.invalidateQueries({queryKey: [query.USER_POSTS, username]})
            }
        },
        onError:(err)=>{
            toast.error(err.message)
        }
    })

    const deleteComment = (commentId: string)=> {
        deleteCommentMutation(commentId) 
    }
  return{
    commentText,
    setCommentText,
    createComment,
    isCreateingComment: isPending,
    deleteComment
  }
}

export default useCommets