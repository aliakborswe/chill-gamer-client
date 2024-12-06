import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";
import Home from "@/components/home/Home";
import MainLayout from "@/MainLayout";
import { BrowserRouter,Routes, Route } from "react-router";
import PrivetRoute from "./PrivetRoute";
import { useContext } from "react";
import { AuthContext } from "@/providers/AuthProviders";
import { AuthInfo } from "@/utils/type";
import AllReviews from "@/components/allReviews/AllReviews";
import AddReviews from "@/components/addReviews/AddReviews";
import MyReviews from "@/components/myReviews/MyReviews";
import GameWatchList from "@/components/gameWatchList/GameWatchList";


const AllRoutes = () => {
  const { user } = useContext(AuthContext) as any as AuthInfo;
   const isAuthenticated = Boolean(user?.email);
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainLayout />}>
            {/* public routes */}
            <Route index element={<Home />} />
            <Route path='about' element={<h1>this is about </h1>} />
            <Route path='reviews' element={<AllReviews />} />
            <Route path='register' element={<Register />} />
            <Route path='login' element={<Login />} />
            Private Routes
            <Route element={<PrivetRoute isAuthenticated={isAuthenticated} />}>
              <Route path='addReview' element={<AddReviews />} />
              <Route path='myReviews' element={<MyReviews />} />
              <Route path='myWatchlist' element={<GameWatchList />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    );
};

export default AllRoutes;

