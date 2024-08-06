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
}

export interface ConversationProps {
  id: number;
  users: GlobalUser[];
  messages: Message[];
}

export interface Message {
  id?: number;
  message: string;
  time: string;
  sender: UserProps;
}
