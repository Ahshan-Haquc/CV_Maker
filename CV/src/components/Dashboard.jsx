import { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import SideBar from "../components/dashboard/SideBar";
import { useAuthUser } from "../context/AuthContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuthUser();
  useEffect(() => {
    document.title = "Dashboard";
    navigate("/home");
  }, []);

  const logout = async () => {
    const res = await fetch("http://localhost:3000/userLogout", {
      method: "GET",
      credentials: "include",
    });
    if (res.ok) {
      setUser(null); // update context
      navigate("/login");
    } else {
      alert("Logout unsuccessful");
    }
  };
  return (
    <div className="min-h-screen min-w-screen ">
      {/* topBar */}
      <div className="w-full min-h-16 relative z-10">
        <div className="w-full h-16 bg-[#210F37]  text-white p-3 flex justify-between items-center fixed top-0 left-0">
          {/* Professional Profile Generator */}
          <div className="text-3xl font-bold">
            <div className="">ProFileGen</div>
            <div className="text-[12px] font-normal text-gray-300">Professional Profile Generator</div>
          </div>
          <div className="mr-5">
            <NavLink
              to={"/home"}
              className="mr-5 p-2  rounded-full hover:bg-[#ff8757] duration-500"
            >
              <i className="fa-solid fa-eye"></i>
            </NavLink>
            <button
              className="p-2  rounded-full hover:bg-[#ff8757] duration-500"
              onClick={logout}
            >
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="flex h-screen w-full relative top-0 left-0">
        <SideBar />
        <div className="flex-grow mr-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
