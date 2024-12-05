import { AuthContext } from "@/providers/AuthProviders";
import { useContext } from "react";

const Home = () => {
     const authInfo = useContext(AuthContext);

     if (!authInfo) {
       console.log(
         "AuthContext is null. Ensure the provider wraps this component."
       );
       return <div>No user data available</div>;
     }

     const { user } = authInfo;
    console.log("From Home", user)
  return <div>this is home component {user?.name}</div>;
};

export default Home;
