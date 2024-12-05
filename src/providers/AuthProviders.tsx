import { createContext, ReactNode, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  User,
  UserCredential,
} from "firebase/auth";
import { app } from "@/firebase/firebase.config";
import { AuthInfo } from "@/utils/type";

// Create a type for the children prop
type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthInfo | null>(null);
const auth = getAuth(app);
const AuthProviders = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState(true);

  // observer auth state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if(user){
            setUser(user);
        }
        setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const registerUser = (
    email: string,
    password: string
  ): Promise<UserCredential> => {
    console.log(email, password);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const authInfo: AuthInfo = {
    user,
    setUser,
    registerUser,
    loading,
    setLoading,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProviders;
