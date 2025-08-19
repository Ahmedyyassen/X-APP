import { useEffect, useRef, useState } from "react";
import usePosts from "../hooks/usePosts";
import { useAppSelector } from "../hooks/useRedux";
import PostCard from "./PostCard";
import { LoaderCircle } from "lucide-react";
import type { Post } from "../types/post";
import DeleteModal from "./DeleteModal";
import { CommentDrawer } from "./CommentDrawer";
import UpdatePostModal from "./UpdatePostModal";
import PostLoader from "./loaders/PostLoader";

const PostList = ({ username }: { username?: string }) => {
  const {user} = useAppSelector((sel) => sel.authSlice);
  const {
    posts = [],
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
    deletePost,
    deleteing,
    checkIsLiked,
    toggleLike,
  } = usePosts(username);

  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const selectedPost = selectedPostId
    ? posts.find((p: Post) => p._id === selectedPostId)
    : null;

  const [deleteDialog, setdeleteDialog] = useState(false);
  const [commentModal, setcommentModal] = useState(false);
  const [updatePostModal, setUpdatePostModal] = useState(false)

  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const cooldownRef = useRef(false); // throttle

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (
            entry.isIntersecting &&
            hasNextPage &&
            !isFetchingNextPage &&
            !cooldownRef.current
          ) {
            cooldownRef.current = true;
            fetchNextPage()?.finally(() => {
              // small cooldown to prevent rapid repeat triggers
              setTimeout(() => {
                cooldownRef.current = false;
              }, 500);
            });
          }
        }
      },
      {
        root: null, // page viewport. set to container element if using scrollable div
        rootMargin: "200px", // start loading a bit earlier
        threshold: 0,
      }
    );

    obs.observe(node);
    return () => obs.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (error) {
    return (
      <div className="flex p-8 items-center justify-center">
        <p className="text-gray-500 mb-4">Failed to load posts</p>
        <button
          className="bg-blue-500 px-4 py-2 rounded-lg"
          onClick={() => refetch()}
        >
          <p className="text-white font-semibold">Retry</p>
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="pb-40">
        { 
          isLoading ? (
            Array(6).fill("").map((_,i)=>(
              <PostLoader key={i} />
            ))
          ) 
          : (
            posts.length === 0 ? (
            <div className="flex p-8 justify-center">
              <p className="text-gray-500">No posts yet.</p>
            </div>
          ) : (
            posts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                onLike={() => toggleLike(post._id, user?._id as string)}
                isLiked={checkIsLiked(post._id, user?._id)}
                currentUser={user!}
                onComment={() => {
                  setSelectedPostId(post._id);
                  setcommentModal(true);
                }}
                setOpenDelete={() => {
                  setSelectedPostId(post._id);
                  setdeleteDialog(true);
                }}
                setOpenUpdate={() => {
                  setSelectedPostId(post._id);
                  setUpdatePostModal(true);
                }}
              />
            ))
          )
          )
        }


        {isFetchingNextPage && (
          <div className="flex justify-center mt-4">
            <LoaderCircle size={46} className="animate-spin text-blue-500" />
          </div>
        )}

        {/* sentinel observed by IntersectionObserver */}
        <div ref={sentinelRef} aria-hidden style={{ height: 1 }} />
      </div>

      {deleteDialog && (
        <DeleteModal
          selectedPost={selectedPost!}
          open={deleteDialog}
          setopenDialog={setdeleteDialog}
          onClose={() => setSelectedPostId(null)}
          onDelete={() => deletePost(selectedPostId!)}
          deleteing={deleteing}
        />
      )}

      {commentModal && (
        <CommentDrawer
          selectedPost={selectedPost!}
          open={commentModal}
          setClose={setcommentModal}
          onClose={() => setSelectedPostId(null)}
          username={username}
        />
      )}

      { updatePostModal &&
        <UpdatePostModal
        selectedPost={selectedPost!}
        open={updatePostModal}
        setClose={()=>setUpdatePostModal(false)}
        onClose={() => setSelectedPostId(null)}
        />
      }
    </>
  );
};

export default PostList;
