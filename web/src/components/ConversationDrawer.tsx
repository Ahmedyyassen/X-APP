import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerTitle } from "./ui/drawer";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useEffect, useLayoutEffect, useRef, type ChangeEvent } from "react";
import { ArrowLeft, Laugh, Send } from "lucide-react";
import MessageItem from "./MessageItem";
import EmojiPicker from "emoji-picker-react";
import useEmoji from "../hooks/useEmoji";
import { useAppSelector } from "../hooks/useRedux";
import TypingIndicator from "./TypingIndicator";
import { AnimatePresence } from "framer-motion";

type Props = {
  closeConversation: () => void;
  sendMessage: () => void;
  newMessage: string;
  setNewMessage:  React.Dispatch<React.SetStateAction<string>>;
  isChateOpen: boolean;
  handleKeyDown:(e:React.KeyboardEvent<HTMLTextAreaElement>)=>void;
  handleKeyUp:()=>void;
};

export function ConversationDrawer({
  closeConversation,
  newMessage,
  sendMessage,
  setNewMessage,
  isChateOpen,
  handleKeyDown,
  handleKeyUp,
}: Props) {

  const isActive = newMessage.trim().length > 0;
  const scrollRef = useRef<HTMLDivElement>(null);
  const {emojiRef,openEmoji,setopenEmoji} = useEmoji();
  const { selectedUserDate, typingStatus,selectedChatMessages} = useAppSelector((sel) => sel.chatSlice);
  const { user } = useAppSelector((sel)=> sel.authSlice);

  const isTyping = typingStatus[selectedUserDate?._id ?? ""];
  

    useLayoutEffect(() => {
      const el = scrollRef.current;
      if (!el) return;
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }, [selectedChatMessages, isChateOpen]);



  useEffect(() => {
    if (isChateOpen) {
        // Wait for the modal + messages to fully render
        const timeout = setTimeout(() => {
        textareaRef.current!.focus();
        scrollRef.current!.scrollTop = scrollRef.current!.scrollHeight;
      }, 50); // small delay (50ms) to ensure height is updated

      return () => clearTimeout(timeout);
    }
  }, [isChateOpen]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineHeight = 24; // match your Tailwind text-base line height

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(e.target.value);

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
    if (textareaRef.current && newMessage.trim() === "") {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.overflowY = "hidden";
    }
  }, [newMessage]);
  


  return (
    <Drawer open={isChateOpen} onOpenChange={closeConversation}>
      {/* Full screen height */}
      <DrawerContent className="h-screen md:h-screen flex flex-col" aria-description={"Message modal"} >
        <VisuallyHidden>
          <DrawerTitle>Chat Messages</DrawerTitle>
          <DrawerDescription>Start or continue your conversation here.</DrawerDescription>
        </VisuallyHidden>
        <div className="mx-auto w-full max-w-2xl md:max-w-4xl flex flex-col h-full overflow-y-auto pb-12 relative">
          <div className="flex flex-row items-center px-4 py-3 border-b border-gray-300 dark:border-gray-800">
            <button className="mr-3" onClick={closeConversation}>
              <ArrowLeft name="arrow-left" size={24} color={"#1DA1F2"} />
            </button>
            <img
              src={selectedUserDate?.profilePicture}
              className="size-10 rounded-full mr-3 object-cover"
            />
            <div className="flex-1">
              <div className="flex-row items-center">
                <p className="font-semibold mr-1">
                  {selectedUserDate?.fullName}
                </p>
                {/* {selectedConversation.user.verified && (
                  <CheckCircle
                    name="check-circle"
                    size={16}
                    color={"#1DA1F2"}
                  />
                )} */}
              </div>
              <p className="text-gray-500 text-sm">
                @{selectedUserDate?.username}
              </p>
            </div>
          </div>
          {/* Conver Header */}

          <div ref={scrollRef} className=" overflow-y-auto p-4 space-y-4">
            <p className="text-center text-gray-400 text-sm mb-4 relative">
              This is the beginning of your conversation with{" "}
              {selectedUserDate?.fullName}
            </p>

            {selectedChatMessages.map((message) => (
              <MessageItem
                key={message._id}
                avatar={selectedUserDate?.profilePicture || "/icon.png"}
                message={message}
                isFromUser={message.sender === user?._id}
              />
            ))}

          <AnimatePresence>
            {isTyping && (
              <div className="absolute bottom-20 left-4 z-10">
                <TypingIndicator />
              </div>
            )}
          </AnimatePresence>
          </div>
          {/* Comments Section */}

          {/* Comment Input */}
          <DrawerFooter className="shrink-0 border-t absolute bottom-0 w-full bg-white dark:bg-neutral-950 px-4 py-3">
            <div className="flex items-end gap-2 w-full">
              {/* Input container */}
              <div className="flex-1 flex items-center bg-gray-100 dark:bg-zinc-800 rounded-4xl pl-4 pr-12 py-2 relative">
                { openEmoji && 
                <div ref={emojiRef} className="absolute right-3 bottom-12">
                   <EmojiPicker 
                    open={openEmoji}
                    onEmojiClick={(e)=> setNewMessage((prev)=> prev + e.emoji )}
                    /></div>}
                <Laugh className="absolute right-3 bottom-2 cursor-pointer" onClick={()=> setopenEmoji((p)=>!p)} />
                <textarea
                  ref={textareaRef}
                  name="message"
                  id="message"
                  placeholder="Start a message..."
                  value={newMessage}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  onKeyUp={handleKeyUp}
                  className="flex-1 text-base text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 bg-transparent outline-none resize-none overflow-hidden"
                  rows={1}
                />
              </div>

              {/* Send Button */}
              <button
                onClick={sendMessage}
                disabled={!isActive}
                className={`size-10 flex items-center justify-center rounded-full transition-colors
        ${
          isActive
            ? "bg-gray-500 hover:bg-blue-600"
            : "bg-gray-400  cursor-not-allowed"
        }`}
              >
                <Send size={20} color="white" />
              </button>
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
