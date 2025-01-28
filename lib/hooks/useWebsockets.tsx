import { useEffect, useCallback, useState } from "react";
import { datasource } from "../common/datasource";
import { useChat } from "../context/ConversationContext";
import { NewMessage, PayloadMessage } from "../@types/app";
import { useActiveConversation } from "../context/activeConversation";
import { useGlobalContext } from "../context/appContext";
import { MessageState } from "../common/common";

const useWebSocket = () => {
  const { state, dispatch } = useChat();
  const socket = datasource.getSocket(); 
  const { user } = useGlobalContext();
  const { activeConversation } = useActiveConversation();
  const [count, setCount] = useState(0)
  const markMessageState = useCallback((state: MessageState, conversationId: string) => {
    datasource.getSocket().emit('message-state', {
      state,
      conversationId
    });
  }, [socket])

  const handleIncomingMessage = useCallback(
    (res: NewMessage) => {
      if (res.user.id !== user?.id) {
        if (res.conversation.id === activeConversation?.id) {
          markMessageState(MessageState.READ, res.conversation.id)
        } else {
          const conv = state.conversations.find(conv => conv.id === res.conversation.id);
          if(conv){
            markMessageState(MessageState.DELIVERED, res.conversation.id)
          }
        }
      }
      // Dispatch the new message to the chat state
      dispatch({ type: "ADD_MESSAGE", payload: res });
    },
    [activeConversation, dispatch, socket, state.conversations, user?.id, markMessageState]
  );
  const handleMessageState = useCallback((res: PayloadMessage) => {
    console.log('received a state change')
    dispatch({ type: "UPDATE_MESSAGE", payload: res });
  }, [dispatch])

  useEffect(() => {
    // Listener for message-state updates
    socket.emit('join');
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
  }, [socket, dispatch, handleIncomingMessage, handleMessageState, count]);

  return { state};
};

export default useWebSocket;
