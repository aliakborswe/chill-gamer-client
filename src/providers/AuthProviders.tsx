import { createContext, ReactNode, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
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
const googleProvider = new GoogleAuthProvider();
const AuthProviders = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState(true);


  // observer auth state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
    setUser(user as User);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // login with google popup
  const loginWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // login with email and password
  const loginWithEmailPass = (
    email: string,
    password: string
  ): Promise<UserCredential> => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const registerUser = (
    email: string,
    password: string
  ): Promise<UserCredential> => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  //update user information
  const updateUserProfile = (updateInfo: object) => {
    return updateProfile(auth.currentUser as User, updateInfo);
  };

  // LogOut user
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };
  const authInfo: AuthInfo = {
    user,
    setUser,
    loginWithGoogle,
    loginWithEmailPass,
    registerUser,
    updateUserProfile,
    loading,
    setLoading,
    logOut,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProviders;
