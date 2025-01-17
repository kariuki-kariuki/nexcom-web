import { useEffect, useCallback } from "react";
import { datasource } from "../common/datasource";
import { useChat } from "../context/ConversationContext";
import { NewMessage, PayloadMessage } from "../@types/app";
import { useActiveConversation } from "../context/activeConversation";
import { useGlobalContext } from "../context/appContext";
import { MessageState } from "../common/common";

const useWebSocket = () => {
  const { state, dispatch } = useChat();
  const socket = datasource.getSocket(); // Use a single socket instance
  const { user } = useGlobalContext();
  const { activeConversation } = useActiveConversation();

  const handleIncomingMessage = useCallback(
    (res: NewMessage) => {
      if (res.user.id !== user?.id) {
        if (res.conversation.id === activeConversation?.id) {
          // Mark the message as read if it's for the active conversation
          socket.emit("message-state", {
            state: MessageState.READ,
            conversationId: activeConversation.id,
          });
        } else {
          // Check if the conversation exists in state
          const hasConvo = state.conversations.find(
            (conv) => conv.id === res.conversation.id
          );
          if (hasConvo) {
            socket.emit("message-state", {
              state: MessageState.DELIVERED,
              conversationId: hasConvo.id,
            });
          }
        }
      }
      // Dispatch the new message to the chat state
      dispatch({ type: "ADD_MESSAGE", payload: res });
    },
    [activeConversation, dispatch, socket, state.conversations, user?.id]
  );

  useEffect(() => {
    // Listener for message-state updates
    const handleMessageState = (res: PayloadMessage) => {
      dispatch({ type: "UPDATE_MESSAGE", payload: res });
    };

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
  }, [socket, dispatch, handleIncomingMessage]);

  return { state };
};

export default useWebSocket;
