export interface Message {
  id?: number;
  email: string;
  name: string;
  subject: string;
  message: string;
  status?: MessageStatus;
}
