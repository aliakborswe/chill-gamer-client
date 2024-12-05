import { AuthContext } from '@/providers/AuthProviders';
import { AuthInfo } from '@/utils/type';
import  { useContext } from 'react';
import { Button } from '../ui/button';
import Swal from 'sweetalert2';

const Header = () => {
    const { user, logOut } = useContext(AuthContext) as any as AuthInfo;

    const handleLogOut = () => {
        logOut().then(() => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "successfully logged out",
              showConfirmButton: false,
              timer: 1000,
            });
        })
    }
    return (
      <div>
        this is header {user?.email}
        <Button onClick={handleLogOut}>Logout</Button>
      </div>
    );
};

export default Header;