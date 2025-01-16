'use client';

import React, { useEffect } from 'react';
import { GlobalUser, UserContextType } from '../@types/app';
import { datasource } from '../common/datasource';

export const AppContext = React.createContext<UserContextType | null>(null);

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = React.useState<GlobalUser | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isLoggedIn, setIsLoggedin] = React.useState<boolean>(false);

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
        setIsLoggedin(true);
      }
      setIsLoading(false);
    }
    getUser();
  }, []);
  return (
    <AppContext.Provider value={{ user, setUser, isLoading, isLoggedIn }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
