export interface IUser {
  name: string | null;
  avatar: string | null;
  email: string | null;
  apiKey: string | null;
}

export type UserContextType = {
  user: IUser;
  updateUser: (user: IUser) => void;
};
