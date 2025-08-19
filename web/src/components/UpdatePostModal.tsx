import { FaXmark } from "react-icons/fa6";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import type { Post } from "../types/post";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { imageTo64Base } from "../utils/base64";
import useUpdatePost from "../hooks/useUpdatePost";
import { Image, Laugh, Loader } from "lucide-react";
import EmojiPicker from "emoji-picker-react";

type Props = {
  open: boolean;
  selectedPost: Post;
  setClose: () => void;
  onClose: () => void;
};
const UpdatePostModal = ({ onClose, open, selectedPost, setClose }: Props) => {
  const {
    updatedPost,
    setimage,
    isPending,
    saveData,
    isDisable,
    setupdatedPost,
    image,
  } = useUpdatePost({selectedPost,setClose});

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setimage(e.target.files[0]);
      const image64 = await imageTo64Base(e.target.files[0]);
      setupdatedPost((p) => ({ ...p, image: image64 }));
    }
  };

  const handleClose = () => {
    onClose();
    setimage(null);
    setupdatedPost({ content: "", image: "" });
    setClose();
  };
  const removerImage = () => {
    setupdatedPost((p) => ({ ...p, image: selectedPost.image! }));
    setimage(null);
  };

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineHeight = 24; // match your Tailwind text-base line height

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setupdatedPost((p) => ({ ...p, content: e.target.value }));
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const maxHeight = lineHeight * 7; // 7 lines max
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
  if (textareaRef.current) {
    textareaRef.current.style.height = "auto";
    const maxHeight = lineHeight * 7; // 7 lines max
    const scrollHeight = textareaRef.current.scrollHeight;

    textareaRef.current.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
    textareaRef.current.style.overflowY =
      scrollHeight > maxHeight ? "auto" : "hidden";
  }
}, [updatedPost.content]);



  const [openEmoji, setopenEmoji] = useState(false);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle className="text-center">Update Profile</DialogTitle>
        </DialogHeader>
        <form>
          <div className="flex flex-col w-full mx-auto items-center justify-center gap-3 py-4">
            <div className="w-full relative">
              <div className={`w-full rounded-lg overflow-hidden relative mb-2`} >
                {image && (
                  <button
                    onClick={removerImage}
                    type="button"
                    className="absolute top-2 right-2 size-8 bg-black opacity-60 p-1 rounded-full flex items-center justify-center z-2 cursor-pointer"
                  >
                    <FaXmark className="text-white"  />
                  </button>
                )}
                {(updatedPost.image || image) && (
                  <>
                  <div className="h-54 overflow-hidden relative">
                    <input
                      type="file"
                      name="banner"
                      onChange={handleImageChange}
                      className="absolute top-0 left-0 w-full h-full cursor-pointer scale-150 hover:bg-gray-900 opacity-0 hover:opacity-15 transition-colors"
                    />
                    <img
                      className="object-center object-cover h-full w-full"
                      src={updatedPost.image}
                      alt="banner image"
                    />
                  </div>
                  </>
                )}
              </div>
            </div>

            <div className="flex-1 flex items-center bg-gray-100 dark:bg-zinc-800 w-full rounded-lg py-2 relative">
              {openEmoji && (
                <span className="absolute right-3 bottom-12">
                  <EmojiPicker
                    open={openEmoji}
                    onEmojiClick={(e) =>
                      setupdatedPost((prev) => ({...prev, content: prev.content + e.emoji}))
                    }
                  />
                </span>
              )}
              <Laugh
                className="absolute right-3 bottom-2 cursor-pointer"
                onClick={() => setopenEmoji((p) => !p)}
              />
              <textarea
                ref={textareaRef}
                name="message"
                id="message"
                placeholder="Start a message..."
                value={updatedPost.content}
                onChange={handleChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    saveData();
                  }
                }}
                className="flex flex-1 w-full text-base px-4 pr-10 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 outline-none resize-none overflow-hidden"
                rows={1}
              />
            </div>
          </div>
          <DialogFooter>
            <div className="flex justify-between w-full">
              {!(image || updatedPost.image) && (
                <button  className="relative overflow-hidden">
                  <input onChange={handleImageChange}  type="file" title="Add image" className="absolute scale-150 left-0 w-full opacity-0" />
                <Image />
              </button>

              )}
            <Button
              className="cursor-pointer ml-auto"
              type="button"
              disabled={isDisable()}
              onClick={saveData}
            >
              {isPending ? (
                <Loader className="animate-spin" size={24} />
              ) : (
                "Update"
              )}
            </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdatePostModal;
