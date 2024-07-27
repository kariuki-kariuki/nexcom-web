import React, { createContext, useState } from 'react';
import { ConversationProps } from '../@types/chat';

export type activeConversatonType = {
  activeConversation: ConversationProps | null;
  setActiveConversation: (convo: ConversationProps) => void;
};

export const ConversationContext = createContext<activeConversatonType | null>(
  null,
);

const ConversationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
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
