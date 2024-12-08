import { AuthContext } from "@/providers/AuthProviders";
import { AuthInfo } from "@/utils/type";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import ActiveLink from "./ActiveLink";
import {
  LogIn,
  LogOut,
  Menu,
  UserRoundPlus,
  X,
} from "lucide-react";
import logo from "@/assets/logo.svg";
import { Button } from "../ui/button";
import { Tooltip } from "react-tooltip";

const Header = () => {
  const { user, logOut } = useContext(AuthContext) as any as AuthInfo;
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => setShowMenu(!showMenu);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
      toast.success("Logout Success!");
    } catch (err: any) {
      toast.error(err.message || "Logout Failed");
    }
  };
  return (
    <header className='bg-white'>
      <div className='container mx-auto px-2.5 py-5'>
        <nav className='flex flex-row gap-6 justify-between items-center'>
          <div className='flex items-center'>
            {/* mobile menu icon */}
            <div onClick={toggleMenu} className='lg:hidden'>
              {showMenu == true ? <X size={36} /> : <Menu size={36} />}
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
            <div className='flex flex-col lg:flex-row  gap-4 md:items-center text-base font-medium text-black w-full'>
              <ActiveLink to='/'>Home</ActiveLink>
              <ActiveLink to='/reviews'>Reviews</ActiveLink>
              <ActiveLink to='/addReview'>Add-Review</ActiveLink>
              <ActiveLink to='/myReviews'>My-Reviews</ActiveLink>
              <ActiveLink to='/myWatchlist'>WatchList</ActiveLink>
              <ActiveLink to='/about'>About</ActiveLink>
            </div>
          </div>

          <div className='flex items-center gap-2 text-base font-semibold [&_a]:flex [&_a]:gap-1 '>
            {user !== null ? (
              <>
                <div className="z-10">
                  <img
                    src={
                      user?.photoURL ||
                      "https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg"
                    }
                    className='w-10 aspect-square rounded-full'
                    alt='photo'
                    data-tooltip-id='my-tooltip'
                    data-tooltip-content={user?.displayName}
                    data-tooltip-place='top'
                  />
                  <Tooltip id='my-tooltip' />
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
                  <Button
                    className='flex items-center gap-1 bg-secondary/90 text-white'
                    variant={"secondary"}
                  >
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
