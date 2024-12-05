import { User, UserCredential } from "firebase/auth";

export type AuthInfo = {
  user?: User;
  setUser?: React.Dispatch<React.SetStateAction<User>>;
  registerUser?: (email: string, password: string) => Promise<UserCredential>;
  loading?: boolean;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  logOut: () =>Promise<void>;
  updateUserProfile: (updateInfo : object) => Promise<void>;
  loginWithGoogle: () => Promise<UserCredential>;
};
