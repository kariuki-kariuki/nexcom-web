import { ProjectIdType } from 'src/@types/types';

export type IncomingMessageBody = {
  conversationId: ProjectIdType;
  message?: string;
  productId?: ProjectIdType;
  receiverId: ProjectIdType;
  files?: Array<Express.Multer.File>;
};

export interface IncomingFile {
  originalname: string; // File name
  mimetype: string; // File type
  buffer: Buffer; // File data
}

export interface IncomingCall {
  receiverId: ProjectIdType;
  signalData: any;
}

export enum OnlineStatus {
  ONLINE = 'online',
  OFFLINE = 'offline',
}
