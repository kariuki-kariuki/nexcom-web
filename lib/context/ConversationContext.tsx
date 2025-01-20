'use client';

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  useState
} from 'react';
import { ChatAction, ChatState, ConversationProps } from '../@types/app';
import { useGlobalContext } from './appContext';
import { datasource } from '../common/datasource';
import { MessageState } from '../common/common';

const initialState: ChatState = {
  conversations: []
};

const ChatContext = createContext<{
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
              messages: conv.messages.map((msg) => msg.user.email !== action.payload.email && msg.state !== MessageState.READ ? {...msg, state: action.payload.state} : msg)
            }
            : conv
        )
      };
    case 'SET_CONVERSATIONS':
      return {
        ...state,
        conversations: action.payload
      };

    default:
      return state;
  }
}

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);
  const { isLoggedIn } = useGlobalContext();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConverSations = async () => {
      const { data, error, loading } =
        await datasource.get<ConversationProps[]>('conversations');

      if (!loading && data) {
        dispatch({ type: 'SET_CONVERSATIONS', payload: data });
      }

      if (error) {
        console.log(error);
      }
      setLoading(false);
    };

    fetchConverSations();

    // return socket.off();
  }, [isLoggedIn]);

  return (
    <ChatContext.Provider value={{ state, dispatch, isLoading }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('please use within react ChatProvider');
  }
  return context;
};
