import { createContext, ReactNode, useState } from "react";
import { getAuth } from "firebase/auth";
import { app } from "@/firebase/firebase.config";

// Define the user type
type User = {
  name: string;
};

type AuthInfo = {
  user: User | null;
};

// Create a type for the children prop
type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthInfo | null>(null);
const auth = getAuth(app);
const AuthProviders = ({ children }: AuthProviderProps) => {
//   const [user, setUser] = useState(AuthContext);
console.log(auth)

  const authInfo: AuthInfo = {
    user: { name: "aliakbr" },
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProviders;
