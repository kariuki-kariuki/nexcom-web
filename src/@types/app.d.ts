import { GlobalUser } from './chat';

export type UserContextType = {
  user: GlobalUser | null;
  updateUser: (user: GlobalUser | null) => void;
};
