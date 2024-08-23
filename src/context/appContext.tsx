import React from 'react';
import { UserContextType } from '../@types/app';
import { GlobalUser } from '../@types/chat';

export const AppContext = React.createContext<UserContextType | null>(null);

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = React.useState<GlobalUser | null>(null);

  const updateUser = (user: GlobalUser | null) => {
    setUser(user);
  };

  return (
    <AppContext.Provider value={{ user, updateUser }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
