import { ChatAction, ConversationProps, GlobalUser } from "../@types/app";
import { create } from "zustand";
import { MessageState } from "../common/common";

type GlobalState = {
  globalUser: GlobalUser | null;
  conversations: ConversationProps[];
  activeConversation: ConversationProps | null;
  newConversation: GlobalUser | null;

  addMessage: (payload: any) => void;
  addConversation: (payload: ConversationProps) => void;
  updateMessage: (payload: any) => void;
  setConversations: (payload: ConversationProps[]) => void;
  updateProfile: (payload: any) => void;
  setActiveConversation: (payload: ConversationProps | null) => void;
  setNewConversation: (payload: GlobalUser | null) => void;
};

const useGlobalStore = create<GlobalState>((set) => ({
  globalUser: null,
  activeConversation: null,
  conversations: [],
  newConversation: null,

  addMessage: (payload) =>
    set((state) => ({
      conversations: state.conversations.map((conv) =>
        conv.id === payload.conversation.id
          ? { ...conv, messages: [...conv.messages, payload] }
          : conv
      ),
    })),

  addConversation: (payload) =>
    set((state) => ({
      conversations: [...state.conversations, payload],
    })),

  updateMessage: (payload) =>
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

  setConversations: (payload) =>
    set(() => ({
      conversations: payload,
    })),

  updateProfile: (payload) =>
    set((state) => ({
      conversations: state.conversations.map((convo) => {
        if (convo.users[0].id === payload.userId) {
          return {
            ...convo,
            users: [
              {
                ...convo.users[0],
                photo: payload.link, // Assuming `photo` is in `payload`.
              },
            ],
          };
        }
        return convo;
      }),
    })),

  setActiveConversation: (payload) =>
    set(() => ({
      activeConversation: payload,
    })),

  setNewConversation: (payload) =>
    set(() => ({
      newConversation: payload,
    })),
}));

export default useGlobalStore;
