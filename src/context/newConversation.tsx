'use client';

import React, { createContext, useState } from 'react';
import { GlobalUser } from '../@types/chat';

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

export default NewConversationProvider;
