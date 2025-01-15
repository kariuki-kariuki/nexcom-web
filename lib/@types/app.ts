export type UserContextType = {
  user: GlobalUser | null;
  setUser: (user: GlobalUser | null) => void;
};

export interface GlobalUser {
  id: number;
  email?: string;
  photo: string;
  firstName: string;
  lastName: string;
  updated_at: string;
  role: string;
}
