'use client'
import React, { useEffect, useCallback, ReactNode, createContext, useReducer, useState, useContext } from "react";
import { ChatAction, ChatState, ConversationProps, NewMessage, PayloadMessage, UpdateProfile } from "../@types/app";
import { useGlobalContext } from "../context/appContext";
import { useSocketContext } from "./useSocket";
import { MessageState } from "../common/common";
import { datasource } from "../common/datasource";
import { useGlobalStore } from "../context/global-store.provider";
import useSound from "use-sound"

const initialState: ChatState = {
  conversations: []
};

const WebSocketContext = createContext<{
  state: ChatState;
  dispatch: React.Dispatch<ChatAction>;
  isLoading: boolean;
}>({
  state: initialState,
  dispatch: () => undefined,
  isLoading: true
});

function chatReducer(state: ChatState, action: ChatAction) {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return {
        ...state,
        conversations: state.conversations.map((conv) =>
          conv.id === action.payload.conversation.id
            ? { ...conv, messages: [...conv.messages, action.payload] }
            : conv
        )
      };
    case 'ADD_CONVERSATION':
      return {
        ...state,
        conversations: [...state.conversations, action.payload]
      };
    case 'UPDATE_MESSAGE':
      return {
        ...state,
        conversations: state.conversations.map((conv) =>
          conv.id === action.payload.conversationId
            ? {
              ...conv,
              messages: conv.messages.map((msg) => msg.user.id !== action.payload.userId && msg.state !== MessageState.READ ? { ...msg, state: action.payload.state } : msg)
            }
            : conv
        )
      };
    case 'SET_CONVERSATIONS':
      return {
        ...state,
        conversations: action.payload
      };

    case 'UPDATE_PROFILE':
      return {
        ...state,
        conversations: state.conversations.map(convo => {
          if (convo.users[0].id === action.payload.userId) {
            return {
              ...convo,
              users: [
                {
                  ...convo.users[0],
                  photo: action.payload.link // Assuming `photo` is in `action.payload`.
                },
              ]
            };
          }
          return convo;
        })
      };


    default:
      return state;
  }
}


export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);
  const [isLoading, setLoading] = useState(true);
  const setConversations = useGlobalStore(state => state.setConversations);
  const addConversation = useGlobalStore(state => state.addConversation);
  const addMessage = useGlobalStore(state => state.addMessage);
  const updateMessage = useGlobalStore(state => state.updateMessage);
  const updateProfile = useGlobalStore(state => state.updateProfile);
  const [play] = useSound('/sounds/message.mp3');
  const [playFx] = useSound('/sounds/level-up.mp3');

  const socket = useSocketContext();
  const { user, isLoggedIn } = useGlobalContext();
  const handleIncomingMessage = useCallback((res: NewMessage) => {
    try {
      if (res.productId) {
        playFx();
      } else {
        play()
      }
    }
    catch (e) {
      console.log(e)
    }
    addMessage(res);
  }, [play, playFx]);

  const handleMessageState = useCallback((res: PayloadMessage) => {
    updateMessage(res);
  }, [])

  const handleUpdateProfile = useCallback((res: UpdateProfile) => {
    updateProfile(res);
  }, [])

  const handleNewConversation = useCallback((res: ConversationProps) => {
    addConversation(res)
  }, []);

  useEffect(() => {
    const getConversations = async () => {
      const { data } = await datasource.get<ConversationProps[]>('conversations')
      if (data) {
        setConversations(data)
      }
    }
    getConversations();
  }, [isLoggedIn, user])

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
    <WebSocketContext.Provider value={{ state, dispatch, isLoading }}>
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