import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useApiClient from "./useApiClient";
import type { AxiosResponse } from "axios";
import type { Post } from "../types/post";
import { postApi } from "../lib/api";
import { query } from "../constants/queries";
import { startTransition, useCallback, useState } from "react";

type PaginatedPostsResponse = {
  posts: Post[];
  currentPage: number;
  nextPage: number | null;
  hasMore: boolean;
  totalPosts: number;
};

const usePosts = (username?:string) => {
    const api = useApiClient();
    const queryClient = useQueryClient();

      const [optimisticLikesMap, setOptimisticLikesMap] = useState<Record<string, string[]>>({});


  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    refetch,
  } = useInfiniteQuery<
    AxiosResponse<PaginatedPostsResponse>, // TQueryFnData
    Error, // TError
    Post[], // TData (select output)
    (string | undefined)[], // TQueryKey
    number
  >({
    queryKey: username ? [query.USER_POSTS,username] : [query.POST],
    queryFn: ({ pageParam = 1 }) => (username? postApi.getUserPosts(api, username, pageParam, 4) : postApi.getPosts(api, pageParam, 4)),
    getNextPageParam: (lastPage) => {
      return lastPage.data.hasMore ? lastPage.data.nextPage : undefined;
    },
    select: (data) => data.pages.flatMap((page) => page.data.posts),
    initialPageParam: 1,
  });


  const { mutate: likePostMutation } = useMutation({
      mutationFn: (postId: string)=> postApi.likePost(api, postId),
      onError: (err) => {
          console.error("Failed to like post", err);
      },
      onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [query.POST] });
        if (username) {
          queryClient.invalidateQueries({ queryKey: [query.USER_POSTS, username] });
        }
      },
  })

    // ✅ Toggle optimistic like instantly
  const toggleLike = useCallback(
    (postId: string, userId: string) => {

       // Play sound instantly
    const audio = new Audio("/sounds/like.wav");
    audio.play().catch((err) => console.error("Audio play error:", err));

      startTransition(() => {
        setOptimisticLikesMap((prev) => {
          const currentLikes =
            prev[postId] ??
            data?.find((p) => p._id === postId)?.likes ??
            [];
          const hasLiked = currentLikes.includes(userId);

          return {
            ...prev,
            [postId]: hasLiked
              ? currentLikes.filter((id) => id !== userId)
              : [...currentLikes, userId],
          };
        });
      });

      // background mutation
      likePostMutation(postId);
    },
    [data, likePostMutation]
  );

 // ✅ Check if liked (optimistic first)
    const checkIsLiked = useCallback(
    (postId: string, currentUserId?: string) => {
      if (!currentUserId) return false;
      const likes =
        optimisticLikesMap[postId] ??
        data?.find((p) => p._id === postId)?.likes ??
        [];
      return likes.includes(currentUserId);
    },
    [optimisticLikesMap, data]
  );

  const { mutate: deletePostMutation, isPending:deleteing } = useMutation({
    mutationFn: (postId: string) => postApi.deletePost(api, postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [query.POST] });
      if (username) {
        queryClient.invalidateQueries({ queryKey: [query.USER_POSTS,username] });
      }
    },
  });


  
  return {
    posts:data ?? [],
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    refetch,
    toggleLike,
    checkIsLiked,
    deletePost: (postId:string)=> deletePostMutation(postId),
    deleteing,
  }
}

export default usePosts