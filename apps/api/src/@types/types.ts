import { Payload } from './chat/chat';

export type ProjectIdType = string;

export enum OrderState {
  FAILED = 'failed',
  SUCCESS = 'success',
  CANCELED = 'canceled',
  PENDING = 'pending',
}

export interface DarajaTypes {
  MerchantRequestID: string;
  CheckoutRequestID: string;
  ResponseCode: string;
  ResponseDescription: string;
  CustomerMessage: string;
}

export type CallbackMetadataItem = {
  Name: string;
  Value: string | number;
};

export type CallbackMetadata = {
  Item: CallbackMetadataItem[];
};

export type StkCallBack = {
  MerchantRequestID: string;
  CheckoutRequestID: string;
  ResultCode: number;
  ResultDesc: string;
  CallbackMetadata: CallbackMetadata;
};

export type MpesaResponse = {
  Body: {
    stkCallback: StkCallBack;
  };
};

export type MpesaFailure = {
  Body: {
    stkCallBack: StkCallBackFailure;
  };
};

export type StkCallBackFailure = {
  MerchantRequestID: string;
  CheckoutRequestID: string;
  ResultCode: number;
  ResultDesc: string;
};

export interface AuthenticatedRequest extends Request {
  user: Payload;
}

export enum UserRoles {
  SHOP_ADMIN = 'SHOP_ADMIN',
  USER = 'USER',
}
