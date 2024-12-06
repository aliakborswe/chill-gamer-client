import Spinner from "@/components/common/Spinner";
import { AuthContext } from "@/providers/AuthProviders";
import { AuthInfo } from "@/utils/type";
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
      <Spinner/>
    );
  }
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={redirectPath} state={{ from: location }} replace />
  );

};

export default PrivetRoute;
