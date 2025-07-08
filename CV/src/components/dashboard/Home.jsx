import { useAuthUser } from "../../context/AuthContext";
import { useUserCV } from "../../context/UserCVContext";
import welcomeImage from "../../assets/Welcome.png";
import { NavLink } from "react-router-dom";

const Home = () => {
  const { user } = useAuthUser();
  const { userCV } = useUserCV();

  const username = user?.email ? user.email.split("@")[0] : "";

  return (
    <div className="h-full w-full pb-10 flex flex flex-col justify-center items-center text-3xl">
      <div className="flex  justify-center items-center">
        <img src={welcomeImage} alt="Welcome" className="h-[200px] w-[200px] block" />
        <div className="flex flex flex-col justify-center items-center">
          <div className="text-gray-500">Welcome {username},</div>
      <div className="text-gray-500 text-md">to</div>
      <div className="text-4xl font-bold">CV Maker</div>
        </div>
      </div>
      {/* below div */}
      <div className="h-[200px] w-[350px] md:w-[900px] p-3 m-3 flex gap-5">
  <NavLink 
    className="h-full w-1/2 rounded-xl bg-gradient-to-br from-blue-300 to-blue-500 text-white
           flex justify-center items-center text-xl font-semibold shadow-lg
           hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out
           cursor-pointer border border-blue-400"
  >
    <i class="fas fa-file-alt text-4xl mr-3"></i>
    Generate Formal CV
  </NavLink>

  <NavLink to={"/viewCV"}
    className="h-full w-1/2 rounded-xl bg-gradient-to-br from-purple-300 to-purple-500 text-white
           flex justify-center items-center text-xl font-semibold shadow-lg
           hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out
           cursor-pointer border border-purple-400"
  >
    <i class="fas fa-magic text-4xl mr-3"></i>
    Generate Modern CV
  </NavLink>
</div>
    </div>
  );
};

export default Home;
