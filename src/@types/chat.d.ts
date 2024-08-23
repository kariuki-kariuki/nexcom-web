// interface NestedId {
//   String: string;
// }

import { Shop } from './shop';

// // Define the interface for the nested id object
// export interface NestedId {
//   id: IdString;
// }

// Define the interface for the array elements

export interface UserProps {
  id: number;
  created_at: string;
  name: string;
  avatar: string;
  email: string;
}

export interface GlobalUser {
  id: number;
  email: string;
  photo: string;
  firstName: string;
  lastName: string;
  updated_at: string;
  shop: Shop | null;
}

export interface ConversationProps {
  id: number;
  users: GlobalUser[];
  messages: Message[];
  updated_at: string;
}

export interface Message {
  id?: number;
  message: string;
  user: GlobalUser;
  files: string[] | null;
  updated_at: string;
}
