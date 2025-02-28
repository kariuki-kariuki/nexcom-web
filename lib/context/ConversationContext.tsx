'use client';

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react';
import { ChatState, ConversationProps } from '../@types/app';
import { useGlobalContext } from './appContext';
import { datasource } from '../common/datasource';
import useGlobalStore from '../store/globalStore';

const initialState: ChatState = {
  conversations: []
};

const ChatContext = createContext<{
  isLoading: boolean;
}>({
  isLoading: true
});



export const ChatProvider = ({ children }: { children: ReactNode }) => {
const setConversations = useGlobalStore((state) => state.setConversations)
  const { isLoggedIn } = useGlobalContext();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConverSations = async () => {
      const { data, error, loading } =
        await datasource.get<ConversationProps[]>('conversations');

      if (!loading && data) {
        setConversations(data);
      }

      if (error) {
        console.log(error);
      }
      setLoading(false);
    };

    fetchConverSations();

  }, [isLoggedIn]);

  return (
    <ChatContext.Provider value={{ isLoading }}>
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
