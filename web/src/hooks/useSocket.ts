import { createContext, useContext } from "react";
import type { Socket } from "socket.io-client";

export const SocketContext = createContext<Socket | null>(null);

const useSocket = () => {
  return useContext<Socket | null>(SocketContext);
};

export default useSocket;
