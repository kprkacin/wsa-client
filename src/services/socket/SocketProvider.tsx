import React, { useContext, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { ProviderProps } from './types';

const socketBuild = io('http://localhost:7500', {
  withCredentials: true,
  extraHeaders: {
    'my-custom-header': 'abcd',
  },
});
interface SocketContext {
  socket: Socket;
}
export const SocketProviderContext = React.createContext<SocketContext>({
  socket: socketBuild,
});
export const SocketProvider: React.FC<ProviderProps> = ({ children }) => {
  useEffect(() => {
    () => {
      socketBuild.disconnect();
    };
  }, []);

  return (
    <SocketProviderContext.Provider
      value={{
        socket: socketBuild,
      }}
    >
      {children}
    </SocketProviderContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketProviderContext);
};
