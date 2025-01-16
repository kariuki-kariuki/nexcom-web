'use client';

import React, { createContext, useState } from 'react';
import { ConversationProps } from '../@types/app';

export type activeConversatonType = {
  activeConversation: ConversationProps | null;
  setActiveConversation: (convo: ConversationProps | null) => void;
};

export const ConversationContext = createContext<activeConversatonType | null>(
  null
);

const ConversationProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [activeConversation, setActiveConversation] =
    useState<ConversationProps | null>(null);

  // const updateActiveConver = (active: ConversationProps) => {
  //     setActiveConversation(active);
  // }
  return (
    <ConversationContext.Provider
      value={{ activeConversation, setActiveConversation }}
    >
      {children}
    </ConversationContext.Provider>
  );
};

export default ConversationProvider;
