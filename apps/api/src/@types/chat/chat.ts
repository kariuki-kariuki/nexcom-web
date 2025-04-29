import { Socket } from 'socket.io';
import { ProjectIdType } from '../types';

export interface Payload {
  email: string;
  userId: string;
  artist_id?: number;
  shopId?: ProjectIdType;
}

export type Enable2FA = {
  secret: string;
};

export interface Validate2faMessage {
  link: string;
  message: string;
}

export type AccessToken = {
  token: string;
};

export enum MessageState {
  SENT = 'sent',
  DELIVERED = 'delivered',
  READ = 'read',
}

export interface AuthenticatedSocket extends Socket {
  user?: Payload;
}
