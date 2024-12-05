import { AuthContext } from '@/providers/AuthProviders';
import { AuthInfo } from '@/utils/type';
import  { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import ActiveLink from './ActiveLink';
import { Home, LogIn, LogOut, Menu, SearchSlash, Store, User, UserRoundPlus, X } from 'lucide-react';
import logo from "@/assets/logo.svg"
import { Button } from '../ui/button';

const Header = () => {
    const { user, logOut } = useContext(AuthContext) as any as AuthInfo;
    const [showMenu, setShowMenu] = useState(false);
    const toggleMenu = () => setShowMenu(!showMenu);
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
      <header className='bg-white'>
        <div className='container mx-auto px-2.5 py-5'>
          <nav className='flex flex-row gap-6 justify-between items-center'>
            <div className='flex items-center'>
              {/* mobile menu icon */}
              <div onClick={toggleMenu} className='text-xl lg:hidden'>
                {showMenu == true ? <X /> : <Menu />}
              </div>
              <div className='flex items-center justify-start'>
                <img src={logo} alt='logo' className='w-10' />
                <p className={` font-bold text-xl hidden md:block`}>
                  Chill-Gamer
                </p>
              </div>
            </div>
            <div
              className={`${
                showMenu ? "block bg-white" : "hidden"
              } lg:block absolute z-10 lg:static top-20 left-0 p-4 rounded-xl pr-16 lg:pr-0`}
            >
              <div className='flex flex-col lg:flex-row  gap-4 md:items-center text-base font-semibold text-black w-full'>
                <ActiveLink to='/'>Home</ActiveLink>
                <ActiveLink to='/all-reviews'>All-Reviews</ActiveLink>
                {user && (
                  <>
                    <ActiveLink to='/add-reviews'>Add-Review</ActiveLink>
                    <ActiveLink to='/my-reviews'>My-Reviews</ActiveLink>
                    <ActiveLink to='/game-watch-list'>
                      Game-WatchList
                    </ActiveLink>
                  </>
                )}
              </div>
            </div>
            <div className='flex items-center gap-2 text-base font-semibold [&_a]:flex [&_a]:gap-1 '>
              {user !== null ? (
                <>
                  <div className='md:flex flex-col items-end hidden '>
                    {/* <img
                      src={user?.photoURL}
                      className='w-8 aspect-square rounded-full'
                      alt='photo'
                    /> */}
                    <p className='text-xs'>{user?.email}</p>
                  </div>
                  <Button
                    onClick={handleLogout}
                    className='flex items-center gap-1'
                  >
                    <LogOut />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to='/login'>
                    <Button>
                      <LogIn />
                      Login
                    </Button>
                  </Link>
                  <Link to='/register'>
                    <Button className='flex items-center gap-1 bg-secondary/90 text-white' variant={'secondary'}>
                      <UserRoundPlus />
                      Signup
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </header>
    );
};

export default Header;