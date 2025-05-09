import { MessageState } from '@/lib/common/common';
import { CartItem, ImageInterface, Product, Shop } from './shop';

export type UserContextType = {
  user: GlobalUser | null;
  setIsLoggedIn: (status: boolean) => void;
  setUser: (user: GlobalUser | null) => void;
  isLoading: boolean;
  isLoggedIn: boolean;
};

export interface GlobalUser {
  id: string;
  avatar: ImageInterface;
  updated_at: string;
  role: string;
  status: string;
  shop?: Shop;
  fullName: string
  cartItems?: CartItem[]
  orders?: Order[];
}

export interface UserProps {
  id: string;
  created_at: string;
  name: string;
  avatar: string;
  email: string;
}

export interface AuthResponse {
  token: string,
  user: GlobalUser
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
  files: ImageInterface[] | null;
  updated_at: string;
  state?: MessageState;
  created_at: string;
  productId?: string;
  product?: Product;
}

// Chat State Type
export interface ChatState {
  conversations: ConversationProps[];
}

// PayloadMessage state
export interface PayloadMessage {
  conversationId: string;
  state: MessageState;
  userId: string;
}

export interface PayloadConversation {
  conversation: ConversationProps;
}

// New Message type
export interface NewMessage extends Message {
  conversation: ConversationProps;
}

export interface UpdateProfile {
  user: GlobalUser;
  userId: string
}

// Action Types
export type ChatAction =
  | {
    type: 'ADD_MESSAGE';
    payload: NewMessage;
  }
  | { type: 'ADD_CONVERSATION'; payload: ConversationProps }
  | {
    type: 'UPDATE_MESSAGE';
    payload: PayloadMessage;
  }
  | {
    type: 'SET_CONVERSATIONS';
    payload: ConversationProps[];
  } | {
    type: 'UPDATE_PROFILE';
    payload: UpdateProfile;
  };
;

export interface Analytic {
  month: number;
  count: number;
}

export interface Payment {
  id: number;
  amount: number;
  status: PaymentStatus;
}

export enum PaymentStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILED = 'failed',
}

export enum OrderState {
  FAILED = 'failed',
  SUCCESS = 'success',
  CANCELED = 'canceled',
  PENDING = 'pending',
}
export interface Order {
  id: string;
  payment: Payment;
  orderNumber: number;
  totalAmount: number;
  status: OrderState;
  cartItems: CartItem[]
  user: GlobalUser
}