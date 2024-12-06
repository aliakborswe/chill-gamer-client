import { AuthContext } from "@/providers/AuthProviders";
import { AuthInfo } from "@/utils/type";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import {  useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router";


interface PrivateRouteProps {
  isAuthenticated: boolean;
  redirectPath?: string;
}

const PrivetRoute: React.FC<PrivateRouteProps> = ({
  isAuthenticated,
  redirectPath = "/login",
}) => {
  const { loading } = useContext(AuthContext) as any as AuthInfo;
  const location = useLocation();

  if (loading) {
    return (
      <div className=' container mx-auto px-2.5 flex justify-center'>
        <DotLottieReact
          src='https://lottie.host/9f9444ce-1187-4951-b002-887aa783ee36/LKpMA79FXs.lottie'
          loop
          autoplay
          style={{
            filter: "hue-rotate(-240deg)",
          }}
        />
      </div>
    );
  }
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={redirectPath} state={{ from: location }} replace />
  );

//   return <Navigate to='/login' state={{ from: location }} replace />;
};

export default PrivetRoute;
