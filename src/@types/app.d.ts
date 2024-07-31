export interface IUser {
  id: number | null;
  firstName: string | null;
  photo: string | null;
  email: string | null;
  apiKey: string | null;
}

export type UserContextType = {
  user: IUser;
  updateUser: (user: IUser) => void;
};
