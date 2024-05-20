
interface IdString {
  id: string;
}

// Define the interface for the nested id object
export interface NestedId {
  id: IdString;
}

// Define the interface for the array elements


export interface UserProps {
  id: NestedId,
  created_at: string,
  login_attempts: number,
  name: string,
  avatar: string
  updated_at: string,
  email: string
}

export interface ConversationProps {
  id: NestedId,
  user_1: UserProps,
  user_2: UserProps,
  messages: Message[]
}

export interface Message {
  id: NestedId,
  msg: string,
  sender_id: IdProp
}