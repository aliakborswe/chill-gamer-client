import { AuthContext } from '@/providers/AuthProviders';
import { AuthInfo } from '@/utils/type';
import  { useContext } from 'react';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const Header = () => {
    const { user, logOut } = useContext(AuthContext) as any as AuthInfo;
    const navigate = useNavigate()
    // console.log(user)

    const handleLogout = async () => {
      try {
        await logOut();
        navigate("/login");
        toast.success("Logout Success!");
      } catch(err:any){
        toast.error(err.message || "Logout Failed");
      }
    };
    return (
      <div>
        this is header {user?.email}
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    );
};

export default Header;