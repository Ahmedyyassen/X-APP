import { useMutation, useQueryClient } from "@tanstack/react-query";
import useApiClient from "./useApiClient";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { query } from "../constants/queries";

type Post = {
  content: string;
  image?:File
};

const useCreatePost = () => {
  
  const api = useApiClient();
  const queryClient = useQueryClient();
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ content, image }: Post) => {
      const formData = new FormData();
      if (content) formData.append("content", content);
      if (image) formData.append("image", image);
      return await api.post("/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    onSuccess:(res)=>{
      setContent("");
      setSelectedImage(null);
      queryClient.invalidateQueries({queryKey: [query.POST]});
      toast.success(res.data.message)
    },
    onError:(err)=>{
      toast.error(err.message);
    }
  });

  const createPost = useCallback(() => {    
    if (!content.trim() && !selectedImage) {
      toast.error("Please write something or add an image before posting!");
      return;
    }
      const postDate: Post = { content: content.trim() };
      if (selectedImage) postDate.image = selectedImage;      
      mutate(postDate);
  }, [content, selectedImage, mutate]);

  return {
    content,
    setContent,
    createPost,
    selectedImage,
    setSelectedImage,
    isCreating: isPending,
  };
};

export default useCreatePost;
