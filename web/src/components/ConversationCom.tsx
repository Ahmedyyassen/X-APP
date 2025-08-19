import { AnimatePresence } from "framer-motion";
import type { Conversation, UserPreview } from "../types/message";
import TypingIndicator from "./TypingIndicator";
import { useAppSelector } from "../hooks/useRedux";
import { formatDate } from "../utils/formatters";

type Props = {
  conv: Conversation;
  setOpenModal: () => void;
  openMessage:boolean;
  friendFn: (e: Conversation) => UserPreview | undefined;
};
const ConversationCom = ({ conv, setOpenModal, friendFn, openMessage }: Props) => {
  const { typingStatus,onlineUsers } = useAppSelector((sel) => sel.chatSlice);  

  const isOnline = (userId: string) => onlineUsers.includes(userId);

  return (
    <div
      className="flex flex-row items-center p-5 border-b w-full active:bg-gray-100 dark:active:bg-zinc-900"
      onClick={setOpenModal}
    >
      <div className="rounded-full size-12 mr-3 relative object-cover">
        { isOnline(friendFn(conv)?._id as string) && <span className="absolute size-4 bg-green-500 shadow-2xl border-3 border-white dark:border-black rounded-full right-0 bottom-0"></span>}

        <img
          src={friendFn(conv)?.profilePicture || "/icon.png"}
          className="rounded-full w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col items-start">
        <div className="flex w-full items-center justify-between mb-1">
          <div className="flex flex-row items-center justify-between gap-1">
            <p className="font-semibold text-sm">{friendFn(conv)?.fullName}</p>
            {/* {item.user.verified && (
                              <CheckCircle name='check-circle' size={16} color={"#1DA1F2"} className='ml-1' />
                            )} */}
            <p className="text-gray-500 text-xs ml-1">
              {friendFn(conv)?.username}
            </p>
          </div>
          <p className="text-gray-500 text-sm self-end">
            {formatDate(conv.updatedAt)}
          </p>
        </div>
        { !( typingStatus[friendFn(conv)?._id ?? ""] && !openMessage ) ? (
          <p className="text-gray-500 text-sm line-clamp-1">
            {conv.lastMessage?.content} 
          </p>
        ) : (
          <AnimatePresence>
            <div>
              <TypingIndicator />
            </div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default ConversationCom;
