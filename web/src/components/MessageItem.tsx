import { LinkifyText } from "../helpers/linkifyText";
import type { ReceiveMessage } from "../types/message";
import { formatMessageTime } from "../utils/formatters";

type Props = { 
  message: ReceiveMessage;
  isFromUser: boolean;
  avatar: string;
};

const   MessageItem = ({ message, isFromUser, avatar }: Props) => {

  return (
    <div className={`flex mb-3 ${isFromUser ? "justify-end" : "justify-start"}`}>
      {!isFromUser && (
        <img src={avatar} className="size-8 rounded-full mr-2" />
      )}
      <div className={`flex flex-col max-w-[75%] ml-2 ${isFromUser ? "items-end" : "items-start"}`}>
        <div
            className={`w-full rounded-2xl px-4 py-3 ${
            isFromUser ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-900"
          }`}
        >
          <p className={`${isFromUser ? "text-white" : "text-gray-900"} break-words whitespace-pre-wrap`}>
            {<LinkifyText text={message.content} />}
          </p>
        </div>
        <p className="text-xs text-gray-400 mt-1">{formatMessageTime(message.updatedAt)}</p>
      </div>
    </div>
  );
}

// MessageItem.displayName = "MessageItem";

export default MessageItem;
