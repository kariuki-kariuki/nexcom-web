import React, { createContext, useState } from "react";
import { ConversationProps } from "../@types/chat"

export type activeConversatonType = {
    conversation: ConversationProps | null,
    updateActiveConver: (convo: ConversationProps) => void;
}

export const ConversationContext = createContext<activeConversatonType | null>(null) 

const ConversationProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [conversation, setActiveConversation] = useState<ConversationProps | null>(null)
    
    const updateActiveConver = (active: ConversationProps) => {
        setActiveConversation(active);
    }
    return (
        <ConversationContext.Provider value={{conversation, updateActiveConver}}>
            {children}
        </ConversationContext.Provider>
    )
}

export default ConversationProvider