import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";
import Home from "@/components/home/Home";
import MainLayout from "@/MainLayout";
import { BrowserRouter,Routes, Route } from "react-router";


const AllRoutes = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout/>}>
            <Route index element={<Home/>} />
            <Route path="/about" element={<h1>this is about </h1>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    );
};

export default AllRoutes;