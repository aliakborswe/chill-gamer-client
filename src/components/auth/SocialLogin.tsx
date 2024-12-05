import { AuthContext } from "@/providers/AuthProviders";
import { AuthInfo } from "@/utils/type";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import googleIcon from "@/assets/google.svg"
import { Button } from "../ui/button";


const SocialLogin = () => {
  const { loginWithGoogle } = useContext(AuthContext) as any as AuthInfo;

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handlePopup = () => {
    loginWithGoogle()
      .then(() => {
        navigate(from, { replace: true });
        toast.success("Success");
      })
      .catch((err:any) => {
        toast.error(err.message);
      });
  };
  return (
    <Button
      onClick={handlePopup}
      className='flex items-center gap-2 w-full mb-4'
    >
      <img src={googleIcon} alt='google' className='w-6' />
      <p>Sign With Google</p>
    </Button>
  );
};

export default SocialLogin;
