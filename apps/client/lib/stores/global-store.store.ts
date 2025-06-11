import { createStore } from "zustand";
import { AddUserInGroup, AddUsersToGroupDTO, ConversationProps, ConvsersationType, GlobalUser, NewMessage, PayloadMessage, UpdateGroupProfile, UpdateProfile, UserActionDTO } from "../@types/app";
import { MessageState } from "../common/common";
import { group } from "console";



type GlobalState = {
  user: GlobalUser | null;
  conversations: ConversationProps[];
  activeConversation: ConversationProps | null;
  newConversation: GlobalUser | null;
  loading: boolean;
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
  setIsLoading: (status: boolean) => void,
}

type GroupAction = {
  updateGroupProfile: (payload: UpdateGroupProfile) => void;
  removeGroupAdmin: (payload: UserActionDTO) => void;
  addGroupAdmin: (paylod: AddUserInGroup) => void;
  addUsersToGroup: (payload: AddUsersToGroupDTO) => void;
}

export type GlobalStore = GlobalActions & GlobalState & GroupAction;

export const defaultGlobalInitState: GlobalState = {
  user: null,
  activeConversation: null,
  conversations: [],
  newConversation: null,
  loading: true,
}


export const createGlobalStore = (initState: GlobalState = defaultGlobalInitState) => {
  return createStore<GlobalStore>()((set) => ({
    ...initState,
    setIsLoading: (status: boolean) => set(() => ({ loading: status })),
    addMessage: (payload: NewMessage) =>
      set((state) => ({
        conversations: state.conversations.map((conv) =>
          conv.id === payload.conversation.id
            ? { ...conv, messages: [...conv.messages, payload] }
            : conv
        ),
      })),
      addUsersToGroup: (payload: AddUsersToGroupDTO) => set((state) => ({
        conversations: state.conversations.map((group) => {
          if(group.id === payload.groupId && group.type === ConvsersationType.GROUP){
            group.users = [...group.users, ...payload.users];
            return group
          }
          return group;
        })
      }))
      ,
      addGroupAdmin: (paylod: AddUserInGroup)  => set((state) => ({
        conversations: state.conversations.map((group) => {
          if(group.id === paylod.groupId && group.admins) {
            group.admins = [...group.admins, paylod.user];
            return group;
          }
          return group;
        })
      })),

      removeGroupAdmin: (payload: UserActionDTO) => set((state) => ({
        conversations: state.conversations.map((group) => {
          if(group.id === payload.groupId && group.admins) {
            group.admins = group.admins.filter((admin) => admin.id === payload.userId)
            return group;
          }
          return group;
        })
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

    updateGroupProfile: (payload: UpdateGroupProfile) =>
      set((state) => ({
        conversations: state.conversations.map((convo) => {
          if (convo.id === payload.groupId) {
            convo.profile = payload.profile;
            return convo;
          }
          return convo
        })
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
                  status: payload.user.status
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

