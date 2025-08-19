import { MdInsertPhoto } from "react-icons/md";
import {
  FaBusinessTime,
  FaFaceSmile,
  FaFeather,
  FaGit,
  FaSquarePollHorizontal,
  FaXmark,
} from "react-icons/fa6";
import { Button } from "./ui/button";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { useAppSelector } from "../hooks/useRedux";
import { imageTo64Base } from "../utils/base64";
import useCreatePost from "../hooks/useCreatePost";
import { Loader } from "lucide-react";
import EmojiPicker from "emoji-picker-react";
import useEmoji from "../hooks/useEmoji";

const NewPost = () => {
  const {user,} = useAppSelector((sel) => sel.authSlice);
  const {
    content,
    createPost,
    isCreating,
    selectedImage,
    setContent,
    setSelectedImage,
  } = useCreatePost();

  const [imageText, setimageText] = useState("");

  const handleImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const base = await imageTo64Base(e.target.files[0]);
      setimageText(base);
      setSelectedImage(e.target.files[0]);
    }
  };

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  // Auto resize
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // reset to shrink if needed
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      if (content.trim() === "") {
        textareaRef.current.style.height = "3rm"; // default height
      }
    }
  }, [content]);
  
  const handleRemoveImage = ()=>{
  setSelectedImage(null);
  setimageText("");
  }
  const { emojiRef,openEmoji,setopenEmoji } = useEmoji()

  return (
    <div className="post pb-1 brd">
      <form className="flex flex-col p-2">
        <article className="flex gap-4 p-2">
            <img
              src={user?.profilePicture || "/icon.png"}
              className="size-12 xl:size-14 object-cover object-center rounded-full bg-gray-400"
            />
        {/* Transparent textarea on top */}
        <textarea
          ref={textareaRef}
          name="post"
          id="post"
          value={content}
          onChange={handleChange}
          onKeyDown={(e)=> {
             if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      createPost();
                 }
            }}
          className="p-2 flex-1 bg-transparent focus:outline-none resize-none relative z-10 overflow-hidden"
          placeholder="what's happening?"
          aria-multiline
          rows={1} // start small and grow
        />
          </article>
        {selectedImage && (
          <div className="mt-3 ml-4">
            <div className="relative">
              <img
                src={imageText}
                className="w-full h-64 md:h-96 rounded-2xl object-cover"
              />
              <button
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 size-8 bg-black opacity-60 rounded-full flex
                    items-center justify-center"
              >
                <FaXmark size={16} color={"white"} />
              </button>
            </div>
          </div>
        )}
      </form>
      <div className="flex p-2 md:px-4 w-full items-center justify-between ">
        <div className="flex items-center">
          <button className="relative text-blue-400 overflow-hidden">
            <MdInsertPhoto className="text-xl " />
            <input
              type="file"
              title="upload post photo"
              onChange={handleImage}
              className="absolute cursor-pointer top-0 right-0 scale-200 opacity-0"
            />
          </button>
          <button className="text-blue-400 rounded-full p-2 relative z-2 cursor-pointer">
            {openEmoji && 
            <div ref={emojiRef} className="absolute top-8 left-0">
              <EmojiPicker 
                open={openEmoji}
                onEmojiClick={(e)=> setContent((prev)=> (prev + e.emoji))}
                autoFocusSearch={false}
                 />
              </div>
              }
            <FaFaceSmile className="text-xl" onClick={()=>setopenEmoji((p)=>!p)}  />
          </button>
          <button  className="text-blue-400 rounded-full p-2">
            <FaGit className="text-xl" />
          </button>
          <button  className="text-blue-400 rounded-full p-2">
            <FaSquarePollHorizontal className="text-xl" />
          </button>
          <button  className="text-blue-400 rounded-full p-2">
            <FaBusinessTime className="text-xl" />
          </button>
        </div>

        <div className=" mr-1 flex items-center">
          {content.length > 1 && (
            <p
              className={`text-sm mr-3`}
            >
              {content.length}
            </p>
          )}
          <Button
            onClick={createPost}
            disabled={!(selectedImage || content.trim()) || isCreating}
            className=" bg-blue-400 dark:bg-blue-400 dark:text-white dark:hover:text-black cursor-pointer rounded-full h-11 w-11 lg:h-10 lg:w-24"
          >
            {isCreating ? (
              <Loader size={24} className="animate-spin" />
            ) : (
              <>
                <span className="hidden xl:block">Tweet</span>
                <FaFeather className="xl:hidden" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewPost;
