import { useQuery, useQueryClient } from "@tanstack/react-query";
import { query } from "../constants/queries";
import useApiClient from "./useApiClient";
import { conversationApi } from "../lib/api";
import type {
  Conversation,
  ReceiveMessage,
  SendMessage,
  UserPreview,
} from "../types/message";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "./useRedux";
import {
  addMessage,
  closeChat,
  setSelectedChatMessages,
  setSelectedConversation,
  setSelectedUserData,
} from "../store/slices/ChatSlice";
import useSocket from "./useSocket";
import { useDebounce } from "./useDebounce";

const useConversation = () => {
  const api = useApiClient();
  const socket = useSocket();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const [newMessage, setnewMessage] = useState("");
  const [openMessage, setopenMessage] = useState(false);
  const { user } = useAppSelector((sel) => sel.authSlice);
  const { selectedUserDate, selectedConversation } = useAppSelector(
    (sel) => sel.chatSlice
  );

  const { data, isLoading, error } = useQuery<Conversation[]>({
    queryKey: [query.CONVERSATIONS],
    queryFn: async () => {
      const res = await conversationApi.getConversation(api);
      return res.data.conversations;
    },
  });

const friendFn = (conv: Conversation): UserPreview | undefined => {
  return conv.participants.find((i) => i._id !== user?._id);
};

  const setOpenModal = (conv: Conversation) => {
    dispatch(setSelectedConversation(conv));
    dispatch(setSelectedChatMessages(conv.messages));
    dispatch(setSelectedUserData(friendFn(conv)));
    setopenMessage(true);
  };

  const onClose = () => {
    queryClient.invalidateQueries({ queryKey: [query.CONVERSATIONS] });
    setopenMessage(false);
    dispatch(closeChat());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
      return;
    }

    if (socket && user && selectedUserDate) {
      socket.emit("typing", {
        sender: user?._id,
        recipient: selectedUserDate?._id,
      });
    }
  };

  const stopTyping = useDebounce(() => {
    if (socket && user && selectedUserDate) {
      socket.emit("stop_typing", {
        sender: user?._id,
        recipient: selectedUserDate?._id,
      });
    }
  }, 1000); 

  const handleKeyUp = () => {
    stopTyping();
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !user || !selectedUserDate || !socket) return;

    const optimisticMessage: ReceiveMessage = {
      _id: crypto.randomUUID(), // temporary ID
      sender: user._id,
      recipient: selectedUserDate._id,
      conversationId: selectedConversation?._id ?? "",
      content: newMessage,
      messageType: "text",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // 1. Add optimistic
    dispatch(addMessage(optimisticMessage));

    // 2. Emit to server

    socket.emit("sendMessage", {
      sender: optimisticMessage.sender,
      recipient: optimisticMessage.recipient,
      conversationId: selectedConversation?._id ?? "",
      content: optimisticMessage.content,
      messageType: optimisticMessage.messageType,
    } satisfies SendMessage);

    // 3. Clear input
    setnewMessage("");
  };

  return {
    conversations: data ?? [],
    isLoading,
    error,

    openMessage,
    setOpenModal,
    onClose,
    handleSendMessage,
    handleKeyDown,
    handleKeyUp,
    newMessage,
    setnewMessage,
    friendFn,
  };
};

export default useConversation;
