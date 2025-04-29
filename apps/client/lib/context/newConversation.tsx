'use client';

import React, { createContext, useContext, useState } from 'react';
import { GlobalUser } from '../@types/app';

export type NewConversationType = {
  newConversation: GlobalUser | null;
  setNewConversation: (convo: any) => void;
};

export const NewConversationContext = createContext<NewConversationType | null>(
  null
);

const NewConversationProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [newConversation, setNewConversation] = useState<GlobalUser | null>(
    null
  );

  // const updateActiveConver = (active: ConversationProps) => {
  //     setActiveConversation(active);
  // }
  return (
    <NewConversationContext.Provider
      value={{ newConversation, setNewConversation }}
    >
      {children}
    </NewConversationContext.Provider>
  );
};

export const useNewConverSationContext = () => {
  const context = useContext(NewConversationContext);
  if(!context){
    throw new Error('NewConversationContext must be used within a context')
  }
  return context;
}

export default NewConversationProvider;
