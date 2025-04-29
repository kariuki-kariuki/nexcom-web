'use client';

import React, { useContext, useEffect } from 'react';
import { GlobalUser, UserContextType } from '../@types/app';
import { datasource } from '../common/datasource';

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
      setIsLoading(false);
    }
    getUser();
  }, [isLoggedIn]);
  return (
    <AppContext.Provider value={{ user, setUser, isLoading, isLoggedIn, setIsLoggedIn }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
