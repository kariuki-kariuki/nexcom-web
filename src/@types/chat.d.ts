// interface NestedId {
//   String: string;
// }

// // Define the interface for the nested id object
// export interface NestedId {
//   id: IdString;
// }

// Define the interface for the array elements

export interface UserProps {
  id: number;
  created_at: string;
  login_attempts: number;
  name: string;
  avatar: string;
  // updated_at: string,
  email: string;
}

export interface ConversationProps {
  id: number;
  user_1: UserProps;
  user_2: UserProps;
  messages: Message[];
}

export interface Message {
  id: number;
  message: string;
  time: string;
  sender_id: number;
}
