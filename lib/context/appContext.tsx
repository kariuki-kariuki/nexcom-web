'use client';

import React, { useContext, useEffect } from 'react';
import { ConversationProps, GlobalUser, UserContextType } from '../@types/app';
import { datasource } from '../common/datasource';
import useGlobalStore from '../store/globalStore';

export const AppContext = React.createContext<UserContextType | null>(null);

export const useGlobalContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('context must be used within a global provider');
  }
  return context;
};

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = React.useState<GlobalUser | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
  const setConversations = useGlobalStore((state) => state.setConversations)

  useEffect(() => {
    setIsLoading(true);
    async function getUser() {
      const { data, error, loading } =
        await datasource.get<GlobalUser>('auth/me');
      if (error) {
        console.log(error);
      }
      if (!loading && data) {
        setUser(data);
        setIsLoggedIn(true);
      }
    }
    const fetchConverSations = async () => {
      const { data, error, loading } =
        await datasource.get<ConversationProps[]>('conversations');

      if (!loading && data) {
        setConversations(data);
      }

      if (error) {
        console.log(error);
      }
    };

    getUser();
    fetchConverSations();
    setIsLoading(false);

  }, [isLoggedIn, setConversations]);
  return (
    <AppContext.Provider value={{ user, setUser, isLoading, isLoggedIn, setIsLoggedIn }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
