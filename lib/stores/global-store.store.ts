import { createStore } from "zustand";
import { ConversationProps, GlobalUser, NewMessage, PayloadMessage, UpdateProfile } from "../@types/app";
import { MessageState } from "../common/common";



type GlobalState = {
  user: GlobalUser | null;
  conversations: ConversationProps[];
  activeConversation: ConversationProps | null;
  newConversation: GlobalUser | null;
};

type GlobalActions = {
  addMessage: (payload: NewMessage) => void;
  addConversation: (payload: ConversationProps) => void;
  updateMessage: (payload: PayloadMessage) => void;
  setConversations: (payload: ConversationProps[]) => void;
  updateProfile: (payload: UpdateProfile) => void;
  setActiveConversation: (payload: ConversationProps | null) => void;
  setNewConversation: (payload: GlobalUser | null) => void;
  setUser: (payload: GlobalUser | null) => void;
}

export type GlobalStore = GlobalActions & GlobalState;

export const defaultGlobalInitState: GlobalState = {
  user: null,
  activeConversation: null,
  conversations: [],
  newConversation: null,
}


export const createGlobalStore = (initState: GlobalState = defaultGlobalInitState) => {
  return createStore<GlobalStore>()((set) => ({
    ...initState,
    addMessage: (payload: NewMessage) =>
      set((state) => ({
        conversations: state.conversations.map((conv) =>
          conv.id === payload.conversation.id
            ? { ...conv, messages: [...conv.messages, payload] }
            : conv
        ),
      })),

    addConversation: (payload: ConversationProps) =>
      set((state) => ({
        conversations: [...state.conversations, payload],
      })),

    updateMessage: (payload: PayloadMessage) =>
      set((state) => ({
        conversations: state.conversations.map((conv) =>
          conv.id === payload.conversationId
            ? {
              ...conv,
              messages: conv.messages.map((msg) =>
                msg.user.id !== payload.userId &&
                  msg.state !== MessageState.READ
                  ? { ...msg, state: payload.state }
                  : msg
              ),
            }
            : conv
        ),
      })),

    setConversations: (payload: ConversationProps[]) =>
      set(() => ({
        conversations: payload,
      })),

    updateProfile: (payload: UpdateProfile) =>
      set((state) => ({
        conversations: state.conversations.map((convo) => {
          if (convo.users[0].id === payload.userId) {
            return {
              ...convo,
              users: [
                {
                  ...convo.users[0],
                  avatar: payload.user.avatar, // Assuming `photo` is in `payload`.
                },
              ],
            };
          }
          return convo;
        }),
      })),

    setActiveConversation: (payload: ConversationProps | null) =>
      set(() => ({
        activeConversation: payload,
      })),

    setNewConversation: (payload: GlobalUser | null) =>
      set(() => ({
        newConversation: payload,
      })),

    setUser: (payload: GlobalUser | null) => set(() => ({
      user: payload
    }))
  }))
}

