import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerTitle,
} from "./ui/drawer";
import type { Comment, Post } from "../types/post";
import { Laugh, Loader, Trash } from "lucide-react";
import { useAppSelector } from "../hooks/useRedux";
import useCommets from "../hooks/useCommets";
import { formatDate } from "../utils/formatters";
import { LinkifyText } from "../helpers/linkifyText";
import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, type ChangeEvent } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button } from "./ui/button";
import useEmoji from "../hooks/useEmoji";

type Props = {
  selectedPost: Post | null | undefined;
  onClose: () => void;
  open: boolean;
  setClose: (e: boolean) => void;
  username?:string;
};

export function CommentDrawer({
  onClose,
  open,
  selectedPost,
  setClose,
  username,
}: Props) {
  const {user} = useAppSelector((sel) => sel.authSlice);
  const {
    commentText,
    createComment,
    deleteComment,
    isCreateingComment,
    setCommentText,
  } = useCommets(username);

  const isActive = commentText.trim().length > 0;

  const handleClose = () => {
    onClose();
    setClose(false);
  };

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineHeight = 24; // match your Tailwind text-base line height

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const maxHeight = lineHeight * 5; // 5 lines max
      const scrollHeight = textareaRef.current.scrollHeight;

      textareaRef.current.style.height = `${Math.min(
        scrollHeight,
        maxHeight
      )}px`;
      textareaRef.current.style.overflowY =
        scrollHeight > maxHeight ? "auto" : "hidden";
    }
  };

  // Reset height when cleared
  useEffect(() => {
    if (textareaRef.current && commentText.trim() === "") {
      textareaRef.current!.focus();
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.overflowY = "hidden";
    }
  }, [commentText]);

    const { emojiRef,openEmoji,setopenEmoji } = useEmoji()
  

  return (
    <Drawer open={open} onOpenChange={handleClose}>
      {/* Full screen height */}
      <DrawerContent className="h-screen md:h-screen flex flex-col">
        <VisuallyHidden>
          <DrawerTitle>Comments</DrawerTitle>
          <DrawerDescription>Leave you comment here.</DrawerDescription>
        </VisuallyHidden>
        
        <div className="mx-auto w-full max-w-2xl md:max-w-4xl flex flex-col h-full overflow-y-auto pb-18 relative">
          {/* Post Header */}
          {selectedPost && (
            <div className="p-4 border-b border-gray-300 dark:border-gray-700">
              <div className="flex gap-4">
                <img
                  src={selectedPost.user.profilePicture}
                  alt={`${selectedPost.user.fullName}'s profile`}
                  className="size-10 rounded-full object-cover"
                />
                <div className="flex flex-col overflow-hidden">
                  <p className="font-semibold text-sm truncate">
                    {selectedPost.user.fullName}
                  </p>
                  <p className="text-gray-500 text-xs truncate">
                    {selectedPost.user.username}
                  </p>
                </div>
              </div>
              {selectedPost.content && (
                <p className="mt-2 whitespace-pre-wrap line-clamp-2">
                  <LinkifyText text={selectedPost.content} />
                </p>
              )}
              {selectedPost.image && (
                <img
                  alt="Post"
                  src={selectedPost.image}
                  className="mt-2 w-full max-h-36 xl:max-h-68 object-cover rounded-2xl border border-gray-300 dark:border-gray-700"
                />
              )}
            </div>
          )}

          {/* Comments Section */}
          <div className="flex-1 overflow-y-auto space-y-2 mt-2 px-2">
            {selectedPost?.comments.map((comment) => (
              <CommentItem
                key={comment._id}
                comment={comment}
                currentUserId={user?._id}
                onDelete={deleteComment}
              />
            ))}
          </div>

          <DrawerFooter className="shrink-0 border-t absolute bottom-0 w-full bg-white dark:bg-neutral-950 px-4 py-3">
            <div className="flex items-center gap-2 w-full">
              {/* Input container */}
              <div className="flex-1 flex items-center bg-gray-100 dark:bg-zinc-800 rounded-4xl pl-4 pr-12 py-2 relative">
                {openEmoji && (
                  <div ref={emojiRef} className="absolute right-3 bottom-12">
                    <EmojiPicker
                      open={openEmoji}
                      onEmojiClick={(e) =>
                        setCommentText((prev) => prev + e.emoji)
                      }
                    />
                  </div>
                )}
                <Laugh
                  className="absolute right-3 bottom-2 cursor-pointer"
                  onClick={() => setopenEmoji((p) => !p)}
                />
                <textarea
                  ref={textareaRef}
                  name="comment"
                  id="comment"
                  placeholder="Write a comment..."
                  value={commentText}
                  onChange={handleChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      createComment(selectedPost?._id as string);
                    }
                  }}
                  className="flex-1 text-base text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 bg-transparent outline-none resize-none overflow-hidden"
                  rows={1}
                />
              </div>

              {/* Send Button */}
              <Button
                onClick={() => createComment(selectedPost?._id as string)}
                disabled={isCreateingComment || !isActive}
                className={`flex items-center justify-center rounded-xl transition-colors p-4 ${!isActive ? "cursor-not-allowed" : "cursor-pointer"}`}
              >
                {isCreateingComment ? (
                  <Loader className="animate-spin" />
                ) : (
                  "Reply"
                )}
              </Button>
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

type Params = {
  comment: Comment;
  currentUserId: string | undefined;
  onDelete: (commentId: string) => void;
};

function CommentItem({ comment, currentUserId, onDelete }: Params) {
  return (
    <div className="flex gap-3 shadow border-gray-600 pb-2 bg-slate-200 dark:bg-neutral-900 p-2 rounded-xl">
      <img
        src={comment.user.profilePicture}
        alt={comment.user.fullName}
        className="size-10 rounded-full object-cover"
      />
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-bold">{comment.user.fullName}</p>
            <p className="text-gray-500 text-xs">
              {comment.user.username} · {formatDate(comment.createdAt)}
            </p>
          </div>
          {comment.user._id === currentUserId && (
            <button
              onClick={() => onDelete(comment._id)}
              className="text-icon hover:text-red-400"
            >
              <Trash size={20} />
            </button>
          )}
        </div>
        <p className="mt-1">{comment.content}</p>
      </div>
    </div>
  );
}
