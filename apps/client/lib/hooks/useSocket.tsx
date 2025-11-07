'use client';
import { Socket } from 'socket.io-client';
import { datasource } from '@repo/shared-logic'
import React, { useContext } from 'react';

export const SocketContext = React.createContext<Socket | null>(null);

export const SocketProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const socket = datasource.getSocket();

    return(
        <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
    )

}

export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if(!context){
    throw new Error('context must be used within a global provider')
  }
  return context;
}