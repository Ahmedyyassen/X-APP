import { useEffect, useMemo, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { io, Socket } from "socket.io-client";
import { addMessage, setOnlineUsers, setTypingStatus } from "../store/slices/ChatSlice";
import { SocketContext } from "../hooks/useSocket";
import type { ReceiveMessage } from "../types/message";
import { SERVER_HOST } from "../constants/env";



const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const socket = useRef<Socket>(null);
  const [ready, setReady] = useState(false);

  const dispatch = useAppDispatch();
  const { selectedUserDate } = useAppSelector((sel)=> sel.chatSlice);
  const { user } = useAppSelector((sel) => sel.authSlice);


  useEffect(() => {
    if (user) {
      socket.current = io(SERVER_HOST, {
        withCredentials: true,
        query: { userId: user._id },
      });

      socket.current?.on("connect", () => {
        console.log("Connected to socket server.");
        setReady(true); // trigger re-render only once
      });

      const handleReciveMessage = (message: ReceiveMessage) => {
          if (selectedUserDate?._id === message.sender || 
              selectedUserDate?._id === message.recipient
        ) {             
            dispatch(addMessage(message));
          }
      }

      // add listner to recive message from friend
      socket.current.on("reciveMessage", handleReciveMessage);

      // listen when the user typing
      socket.current.on("show_typing_status", (sender:string)=>{
          dispatch(setTypingStatus({ userId: sender, isTyping: true }));
      })
      socket.current.on("clear_typing_status", (sender:string)=>{
            dispatch(setTypingStatus({ userId: sender, isTyping: false }));
      })

      socket.current.on("onlineUsers", (users: string[]) => {
        dispatch(setOnlineUsers(users));
      });

      return () => {
        socket.current?.off("show_typing_status");
        socket.current?.off("clear_typing_status");
        socket.current?.off("onlineUsers");
        socket.current?.disconnect();
        setReady(false);
      };
    }
  }, [user,dispatch,selectedUserDate?._id]);

    const contextValue = useMemo(() => socket.current, [ready]);


  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
