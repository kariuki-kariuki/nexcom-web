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

export interface BrowserInfo {
  isYaBrowser: boolean;
  isAuthoritative: boolean;
  isMobile: boolean;
  isMobileNative: boolean;
  isTablet: boolean;
  isiPad: boolean;
  isiPod: boolean;
  isiPhone: boolean;
  isiPhoneNative: boolean;
  isAndroid: boolean;
  isAndroidNative: boolean;
  isBlackberry: boolean;
  isOpera: boolean;
  isIE: boolean;
  isEdge: boolean;
  isIECompatibilityMode: boolean;
  isSafari: boolean;
  isFirefox: boolean;
  isWebkit: boolean;
  isChrome: boolean;
  isKonqueror: boolean;
  isOmniWeb: boolean;
  isSeaMonkey: boolean;
  isFlock: boolean;
  isAmaya: boolean;
  isPhantomJS: boolean;
  isEpiphany: boolean;
  isDesktop: boolean;
  isWindows: boolean;
  isLinux: boolean;
  isLinux64: boolean;
  isMac: boolean;
  isChromeOS: boolean;
  isBada: boolean;
  isSamsung: boolean;
  isRaspberry: boolean;
  isBot: boolean;
  isCurl: boolean;
  isAndroidTablet: boolean;
  isWinJs: boolean;
  isKindleFire: boolean;
  isSilk: boolean;
  isCaptive: boolean;
  isSmartTV: boolean;
  isUC: boolean;
  isFacebook: boolean;
  isAlamoFire: boolean;
  isElectron: boolean;
  silkAccelerated: boolean;
  browser: string;
  version: string;
  os: string;
  platform: string;
  geoIp: Record<string, unknown>;
  source: string;
  isWechat: boolean;
}

export interface AnalyticsRequest extends AuthenticatedRequest {
  useragent: BrowserInfo;
}
export enum UserRoles {
  SHOP_ADMIN = 'SHOP_ADMIN',
  USER = 'USER',
}
