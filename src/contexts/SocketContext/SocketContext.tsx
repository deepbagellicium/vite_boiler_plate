import React, { createContext, useContext, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { RealTimeEvent } from "./RealTimeEvents";
import { config } from "config";

interface SocketContextProps {
  children: React.ReactNode;
}

interface SocketHook {
  socket: Socket | null;
  emit: (event: string, data?: any) => void;
  on: (event: string, callback: (...args: any[]) => void) => void;
  setSocketReconnect: any;
}

const SocketContext = createContext<SocketHook | null>(null);

export const SocketProvider: React.FC<SocketContextProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [reconnect, setSocketReconnect] = useState("");

  const emit = (event: string, data?: any) => {
    if (socket) {
      socket.emit(event, data);
    }
  };

  const on = (event: string, callback: (...args: any[]) => void) => {
    if (socket) {
      socket.on(event, callback);
    }
  };

  on(RealTimeEvent.Connected, (e) => {
    if (config.CUSTOM_LOGS) console.log("socket connected", e);
  });

  on(RealTimeEvent.Disconnected, (e) => {
    if (config.CUSTOM_LOGS) console.log("socket disconnected", e);
  });

  on(RealTimeEvent.Message, (e) => {
    if (config.CUSTOM_LOGS) console.log("Message", e);
  });

  useEffect(() => {
    if (config.CUSTOM_LOGS) console.log("🚀", "accessToken");
    if (config.SOCKET_ENABLE) {
      const connect = io(`${config.API_URL}?token=${"accessToken"}`);
      setSocket(connect);
      return () => {
        connect.disconnect();
      };
    }
  }, [reconnect]);

  return (
    <SocketContext.Provider value={{ socket, emit, on, setSocketReconnect }}>
      {children}
    </SocketContext.Provider>
  );
};
export const useSocketContext = (): SocketHook => {
  const context = useContext(SocketContext);
  return context as SocketHook;
};
