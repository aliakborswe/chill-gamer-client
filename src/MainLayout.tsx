import { Outlet } from "react-router";

const MainLayout = () => {
    return (
        <>
            <h1>Main Layout</h1>
            <Outlet/>
        </>
    );
};

export default MainLayout;