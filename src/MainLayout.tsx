import { Outlet } from "react-router";
import Header from "./components/common/Header";

const MainLayout = () => {
    return (
        <>
            <Header/>
            <Outlet/>
        </>
    );
};

export default MainLayout;