import { Outlet, useNavigate } from "react-router-dom";
import { useAuthUser } from "../../context/AuthContext";
import { useEffect } from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import Footer from "./Footer";


const AppLayout = () => {
    const navigate = useNavigate();
    const { user, setUser } = useAuthUser();
    useEffect(() => {
        document.title = "Dashboard";
        navigate("/home");
    }, []);


    return (
        <div className="min-h-screen min-w-screen overflow-hidden">
            <NavBar />
            <div className="flex  w-full relative top-0 left-0 ">
                <SideBar />
                <div className="h-fit flex-grow ">
                    <div className=" p-1 lg:p-6"><Outlet /></div>
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default AppLayout;
