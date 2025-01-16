import { MessageState } from '@/lib/common/common';
import { Shop } from './shop';

export type UserContextType = {
  user: GlobalUser | null;
  setUser: (user: GlobalUser | null) => void;
  isLoading: boolean;
  isLoggedIn: boolean;
};

export interface GlobalUser {
  id: number;
  email?: string;
  photo: string;
  firstName: string;
  lastName: string;
  updated_at: string;
  role: string;
  status: string;
  shop?: Shop;
}

export interface UserProps {
  id: string;
  created_at: string;
  name: string;
  avatar: string;
  email: string;
}

export interface ConversationProps {
  id: string;
  users: GlobalUser[];
  messages: Message[];
  updated_at: string;
}

export interface Message {
  id?: string;
  message: string;
  user: GlobalUser;
  files: string[] | null;
  updated_at: string;
  state?: MessageState;
}
