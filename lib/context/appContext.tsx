'use client';

import React from 'react';
import { GlobalUser, UserContextType } from '../@types/app';

export const AppContext = React.createContext<UserContextType | null>(null);

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = React.useState<GlobalUser | null>(null);

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
