import { Outlet } from "react-router";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

const MainLayout = () => {
    return (
        <div className="bg-primary/5">
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default MainLayout;