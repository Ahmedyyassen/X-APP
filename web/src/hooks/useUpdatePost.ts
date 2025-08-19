import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react"
import { postApi } from "../lib/api";
import useApiClient from "./useApiClient";
import { query } from "../constants/queries";
import toast from "react-hot-toast";
import type { Post } from "../types/post";

type Props={
selectedPost:Post,
setClose:()=>void
}
const useUpdatePost = ({selectedPost,setClose}:Props)=> {
    const api = useApiClient();
    const queryClient = useQueryClient();

    const [updatedPost, setupdatedPost] = useState({
        content:"",
        image: "",
    });
    const [image, setimage] = useState<File | null>(null);


    const { mutate, isPending } = useMutation({
        mutationFn: async({id,content}:{id:string,content:string})=> {
            const formData = new FormData();
            if (image) formData.append("image", image);
            if (content) formData.append("content", content);
            return await postApi.updatePost(api, id, formData)
        },
        onSuccess:(res)=>{
            setimage(null);
            setupdatedPost({content:"",image:""});
            setClose();
            queryClient.invalidateQueries({queryKey: [query.POST]});
            toast.success(res.data.message);
        },
        onError:(err)=>{
            toast.error(err.message);
        }
    })
    useEffect(()=>{
        if (selectedPost) {
            setupdatedPost({
                content: selectedPost.content || "",
                image: selectedPost.image || ""
            })
        }
    },[selectedPost]);

    const isDisable = ():boolean => {
        return isPending || (updatedPost.content === selectedPost.content && !image)
    }

    const saveData = ()=>{
        mutate({id:selectedPost._id, content:updatedPost.content})
    }

  return {
    saveData,
    isPending,
    setimage,
    updatedPost,
    isDisable,
    setupdatedPost,
    image
  }
}

export default useUpdatePost