import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Conversation, ReceiveMessage, UserPreview } from "../../types/message";

type Props={
    selectedUserDate:UserPreview | undefined,
    selectedConversation: Conversation | undefined;
    typingStatus:Record<string, boolean>;
    selectedChatMessages:ReceiveMessage[];
    onlineUsers: string[];
}

const initialState:Props = {selectedUserDate:undefined,selectedConversation:undefined,typingStatus:{}, selectedChatMessages:[],onlineUsers:[]};

const chatSlice = createSlice({
    name: "chatSlice",
    initialState,
    reducers:{
        setSelectedUserData:(state,action:PayloadAction<UserPreview | undefined>) => {
            state.selectedUserDate = action.payload;
            return state;
        },
        setSelectedConversation: (state,action:PayloadAction<Conversation>)=> {
            state.selectedConversation = action.payload;
            return state
        },
        setSelectedChatMessages: (state, action:PayloadAction<ReceiveMessage[]>)=> {
            state.selectedChatMessages = action.payload;
            return state;
        },
        setTypingStatus: (state, action:PayloadAction<{ userId: string; isTyping: boolean }>)=> {
            const { userId, isTyping } = action.payload;
            state.typingStatus[userId] = isTyping;            
            return state;
        },
         setOnlineUsers: (state, action: PayloadAction<string[]>) => {
            state.onlineUsers = action.payload;
        },
        addMessage:(state,action:PayloadAction<ReceiveMessage>)=>{
            const exists = state.selectedChatMessages.find(
                (m) =>
                m.content === action.payload.content &&
                m.sender === action.payload.sender &&
                !m._id.startsWith("temp-") // allow replacing temporary messages
            );
            if (!exists) {
                state.selectedChatMessages = [
                ...state.selectedChatMessages,
                action.payload,
                ];
                if (state.selectedConversation) {
                    const { _id, content, createdAt, updatedAt } = action.payload;

                    state.selectedConversation.lastMessage = {
                        _id,
                        content,
                        createdAt,
                        updatedAt,
                    };
                    }
            }
        },
        closeChat:(state,)=>{
            state.selectedUserDate = undefined;
            state.selectedConversation = undefined;
            state.selectedChatMessages = [];
            return state;
        }
    }
})

export const { setSelectedUserData,setSelectedChatMessages,closeChat,addMessage,setTypingStatus,setSelectedConversation,setOnlineUsers } = chatSlice.actions;
export default chatSlice.reducer;