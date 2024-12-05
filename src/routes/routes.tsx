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
          </Route>
        </Routes>
      </BrowserRouter>
    );
};

export default AllRoutes;