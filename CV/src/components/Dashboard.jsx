import { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import SideBar from "../components/dashboard/SideBar";
import { useAuthUser } from "../context/AuthContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuthUser();
  useEffect(() => {
    document.title = "Dashboard";
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
    <div className="min-h-screen max-h-fit min-w-screen">
      <div className=" bg-[#213448]  text-white p-3 flex justify-between items-center">
        <div className="text-4xl font-bold">Dashboard</div>
        <div className="mr-5">
          <NavLink
            to={"/viewCV"}
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
      <div className="flex h-full w-full">
        <SideBar />
        <div className="flex-grow mr-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
