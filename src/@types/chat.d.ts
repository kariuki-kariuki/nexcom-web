// interface NestedId {
//   String: string;
// }

import { MessageState } from '../common/common';
import { Shop } from './shop';

// // Define the interface for the nested id object
// export interface NestedId {
//   id: IdString;
// }

// Define the interface for the array elements

export interface UserProps {
  id: string;
  created_at: string;
  name: string;
  avatar: string;
  email: string;
}

export interface GlobalUser {
  id: string;
  email?: string;
  photo: string;
  firstName: string;
  lastName: string;
  updated_at: string;
  shop: Shop | null;
  status: string;
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
