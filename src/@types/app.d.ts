import { GlobalUser } from './chat';

export interface IUser {
  id: number | null;
  firstName: string | null;
  photo: string | null;
  email: string | null;
  apiKey: string | null;
}

export type UserContextType = {
  user: GlobalUser | null;
  updateUser: (user: GlobalUser | null) => void;
};
