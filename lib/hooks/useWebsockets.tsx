import { useEffect, useCallback } from "react";
import { ConversationProps, NewMessage, PayloadMessage, UpdateProfile } from "../@types/app";
import { useGlobalContext } from "../context/appContext";
import { MessageState } from "../common/common";
import useGlobalStore from "../store/globalStore";
import { useSocketContext } from "../context/SocketContext";




const useWebSocket = () => {
  const state = useGlobalStore((state) => state)
  const addMessage = useGlobalStore((state) => state.addMessage)
  const updateMessage = useGlobalStore((state) => state.updateMessage)
  const updateProfile = useGlobalStore((state) => state.updateProfile)
  const addConversation = useGlobalStore((state) => state.addConversation)
  const socket = useSocketContext();
  const { user } = useGlobalContext();
  const activeConversation = useGlobalStore((state) => state.activeConversation) ;
  
  // handle message states
  const markMessageState = useCallback((state: MessageState, conversationId: string) => {
    socket.emit('message-state', {
      state,
      conversationId
    });
  }, [socket])

  const handleIncomingMessage = useCallback(
    (res: NewMessage) => {
      if (res.conversation.id === activeConversation?.id) {
        markMessageState(MessageState.READ, res.conversation.id)
      } else {
        const conv = state.conversations.find(conv => conv.id === res.conversation.id);
        if (conv) {
          markMessageState(MessageState.DELIVERED, res.conversation.id)
        }
      }
      // Dispatch the new message to the chat state
      addMessage(res)
    },
    [activeConversation, socket, state.conversations, user?.id, markMessageState]
  );
  const handleMessageState = useCallback((res: PayloadMessage) => {
    updateMessage(res)
  }, [])

  const handleUpdateProfile = useCallback((res: UpdateProfile) => {
    updateProfile(res)
  }, [])

  const handleNewConversation = useCallback((res: ConversationProps) => {
    addConversation(res)
  }, []);

  

  useEffect(() => {
    // Listener for message-state updates

    if (user) {
      socket.emit('join');
      // Attach socket event listeners
      
      socket.on("message-state", handleMessageState);
      socket.on("message", handleIncomingMessage);
      socket.on('new-conversation', handleNewConversation)
      socket.on('updateProfile', handleUpdateProfile)
      socket.on("error", (e) => {
        console.error("Socket error:", e);
      });
    }
    // Clean up the socket listeners on component unmount
    return () => {
      socket.off("message-state", handleMessageState);
      socket.off("message", handleIncomingMessage);
      socket.off("updateProfile", handleUpdateProfile);
      socket.off("new-conversation", handleNewConversation);
      socket.off("error");
    };
  }, [socket, handleIncomingMessage, handleMessageState, handleUpdateProfile, handleNewConversation]);

  return null;
};

export default useWebSocket;

