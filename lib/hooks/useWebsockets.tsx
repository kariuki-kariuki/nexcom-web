import { useEffect, useCallback } from "react";
import { datasource } from "../common/datasource";
import { useChat } from "../context/ConversationContext";
import { NewMessage, PayloadMessage } from "../@types/app";
import { useActiveConversation } from "../context/activeConversation";
import { useGlobalContext } from "../context/appContext";
import { MessageState } from "../common/common";

const useWebSocket = (conversationId: string) => {
  const { state, dispatch } = useChat();
  const socket = datasource.getSocket(); // Use a single socket instance
  const { user } = useGlobalContext();
  const { activeConversation } = useActiveConversation();

  const markMessageState = useCallback((state: MessageState, conversationId: string) => {
    socket.emit('message-state', {
      state,
      conversationId
    });
  }, [socket])

  const handleIncomingMessage = useCallback(
    (res: NewMessage) => {
      if (res.user.id !== user?.id) {
        if (res.conversation.id === activeConversation?.id) {
           markMessageState(MessageState.READ, activeConversation.id)
        } else {
          markMessageState(MessageState.DELIVERED, conversationId)
        }
      }
      // Dispatch the new message to the chat state
      dispatch({ type: "ADD_MESSAGE", payload: res });
    },
    [activeConversation, dispatch, socket, state.conversations, user?.id, markMessageState]
  );
  const handleMessageState = (res: PayloadMessage) => {
    // console.log(`Message state ${res.email} convo: ${res.conversationId}, state: ${res.state}`)
    dispatch({ type: "UPDATE_MESSAGE", payload: res });
  };

  useEffect(() => {
    // Listener for message-state updates
    socket.emit('join', conversationId);
    

    // Attach socket event listeners
    socket.on("message-state", handleMessageState);
    socket.on("message", handleIncomingMessage);

    // Error handling
    socket.on("error", (e) => {
      console.error("Socket error:", e);
    });

    // Clean up the socket listeners on component unmount
    return () => {
      socket.off("message-state", handleMessageState);
      socket.off("message", handleIncomingMessage);
      socket.off("error");
    };
  }, [socket, dispatch, handleIncomingMessage, handleMessageState]);

  return { state };
};

export default useWebSocket;
