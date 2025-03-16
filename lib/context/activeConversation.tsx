'use client';

import React, { createContext, useContext, useState } from 'react';
import { ConversationProps } from '../@types/app';

export type activeConversatonType = {
  activeConversation: ConversationProps | null;
  setActiveConversation: (convo: ConversationProps | null) => void;
};

export const ConversationContext = createContext<activeConversatonType | null>(
  null
);

export const useActiveConversation = () => {
  const context = useContext(ConversationContext);
  if (!context) {
    throw new Error('context must be used within a global provider');
  }
  return context;
}

const ActiveConversationProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [activeConversation, setActiveConversation] =
    useState<ConversationProps | null>(null);

  return (
    <ConversationContext.Provider
      value={{ activeConversation, setActiveConversation }}
    >
      {children}
    </ConversationContext.Provider>
  );
};

export default ActiveConversationProvider;
