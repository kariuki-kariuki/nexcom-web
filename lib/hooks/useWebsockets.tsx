import { useEffect, useCallback, useState, useContext } from "react";
import { useChat } from "../context/ConversationContext";
import { ConversationProps, NewMessage, PayloadConversation, PayloadMessage, UpdateProfile } from "../@types/app";
import { useActiveConversation } from "../context/activeConversation";
import { useGlobalContext } from "../context/appContext";
import { MessageState } from "../common/common";
import { useSocketContext } from "./useSocket";

const useWebSocket = () => {
  const { state, dispatch } = useChat();
  const socket = useSocketContext();
  const { user } = useGlobalContext();
  const { activeConversation, setActiveConversation } = useActiveConversation();
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
      dispatch({ type: "ADD_MESSAGE", payload: res });
    },
    [activeConversation, dispatch, socket, state.conversations, user?.id, markMessageState]
  );
  const handleMessageState = useCallback((res: PayloadMessage) => {
    dispatch({ type: "UPDATE_MESSAGE", payload: res });
  }, [dispatch])

  const handleUpdateProfile= useCallback((res: UpdateProfile)  => {
    dispatch({ type: 'UPDATE_PROFILE', payload: res})
  }, [dispatch])

  const handleNewConversation = useCallback((res: ConversationProps) => {
      dispatch({ type: 'ADD_CONVERSATION', payload: res })
  }, [dispatch]);

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
  }, [socket, dispatch, handleIncomingMessage, handleMessageState, handleUpdateProfile, handleNewConversation]);

  return { state };
};

export default useWebSocket;
