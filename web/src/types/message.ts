
// Base type for all messages
export type BaseMessage = {
  sender: string;       // user ID
  recipient: string;
  conversationId:string; 
  content: string;
  messageType: "text" | "image" | "file";
};

// Client → Server (before saved in DB)
export type SendMessage = BaseMessage & {
  // no _id yet, server will generate it
};

// Server → Client (after saved in DB)
export type ReceiveMessage = BaseMessage & {
  _id: string;          // MongoDB ID from backend
  createdAt: string;
  updatedAt:string;
  // status?: "sent" | "delivered" | "seen"; // optional for read receipts
};


export interface UserPreview {
  _id: string;
  fullName: string;
  username: string;
  profilePicture: string;
}

export interface LastMessage {
  _id: string;
  content: string;
  createdAt: string; // ISO string from backend
  updatedAt:string;
}

export interface Conversation {
  _id: string;
  participants: UserPreview[];
  messages: ReceiveMessage[];
  lastMessage?: LastMessage; // optional because a new conversation may not have messages yet
  updatedAt: string;
}
