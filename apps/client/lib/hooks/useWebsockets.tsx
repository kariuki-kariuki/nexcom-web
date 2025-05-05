'use client'
import React, { useEffect, useCallback, ReactNode, createContext, useState, useContext, useMemo } from "react";
import { ChatState, ConversationProps, GlobalUser, NewMessage, PayloadMessage, UpdateProfile } from "../@types/app";
import { useSocketContext } from "./useSocket";
import { datasource } from "../common/datasource";
import { useGlobalStore } from "../context/global-store.provider";
import useSound from "use-sound"
import { usePathname } from "next/navigation";

const initialState: ChatState = {
  conversations: []
};

const WebSocketContext = createContext<{
  isLoading: boolean;
}>({
  isLoading: true
});




export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setLoading] = useState(true);

  const setIsloading = useGlobalStore(state => state.setIsLoading);
  const setConversations = useGlobalStore(state => state.setConversations);
  const addConversation = useGlobalStore(state => state.addConversation);
  const addMessage = useGlobalStore(state => state.addMessage);
  const updateMessage = useGlobalStore(state => state.updateMessage);
  const updateProfile = useGlobalStore(state => state.updateProfile);
  const conversations = useGlobalStore(state => state.conversations);
  const pathName = usePathname();
  const setUser = useGlobalStore(state => state.setUser);

  const activeConversation = useMemo(() => {
    return conversations.find((conv) => `/chat/${conv.id}` === pathName);
  }, [conversations, pathName]);

  const [play] = useSound('/sounds/message.mp3');
  const [playFx] = useSound('/sounds/level-up.mp3');
  const socket = useSocketContext();
  const user = useGlobalStore((state) => state.user);
  console.log('Render')
  const handleIncomingMessage = useCallback((res: NewMessage) => {
    try {
      if (res.productId) {
        playFx();
      } else if (res.conversation.id !== activeConversation?.id) {
        console.log(`resId ${res.conversation.id}: active: ${activeConversation?.id}`)
        play()
      }
    }
    catch (e) {
      console.log(e)
    }
    addMessage(res);
  }, [play, playFx, activeConversation]);

  const handleMessageState = useCallback((res: PayloadMessage) => {
    updateMessage(res);
  }, [])

  const handleUpdateProfile = useCallback((res: UpdateProfile) => {
    updateProfile(res);
  }, [])

  const handleNewConversation = useCallback((res: ConversationProps) => {
    addConversation(res)
  }, []);
  const getConversations = async () => {
    try {
      setIsloading(true)
      const { data } = await datasource.get<ConversationProps[]>('conversations')
      if (data) {
        setConversations(data)
      }
    } finally {
      setIsloading(false)
    }
  }

  const getUser = async () => {
    const { data } = await datasource.get<GlobalUser>('auth/me')
    if (data) {
      setUser(data)
    }
  }

  useEffect(() => {
    if(!user) return;
    getConversations()
  }, [user])

  useEffect(() => {
    getUser()
  }, [])

  useEffect(() => {
    if (!user) return;
    // Attach socket event listeners
    socket.on("message-state", handleMessageState);
    socket.on("message", handleIncomingMessage);
    socket.on('new-conversation', handleNewConversation)
    socket.on('updateProfile', handleUpdateProfile)
    socket.on("error", (e) => {
      console.error("Socket error:", e);
    });

    // Clean up the socket listeners on component unmount
    return () => {
      socket.off("message-state", handleMessageState);
      socket.off("message", handleIncomingMessage);
      socket.off("updateProfile", handleUpdateProfile);
      socket.off("new-conversation", handleNewConversation);
      socket.off("error");
    };
  }, [socket, user, handleIncomingMessage, handleMessageState, handleUpdateProfile, handleNewConversation]);

  return (
    <WebSocketContext.Provider value={{ isLoading }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext)
  if (!context) {
    throw new Error('Please use within react WebSocketProvider');
  }
  return context;
}