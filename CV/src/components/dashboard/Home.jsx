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
      <div className="h-[200px] w-[350px] md:w-[1000px] p-3 m-3 flex gap-5">
<div class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
  {/* Formal CV - Professional Blue/Indigo */}
  <NavLink
    to="/viewFormalCV"
    className="w-full p-6 h-[180px] rounded-xl text-white font-semibold tracking-wide
      shadow-[0_0_15px_rgba(0,0,0,0.4)]
      hover:shadow-[0_0_25px_rgba(59,130,246,0.7)] transition-all duration-300
      hover:scale-105 bg-gradient-to-tr from-blue-500 to-indigo-600 border border-blue-400
      flex flex-col items-center justify-center space-y-3"
  >
    <i className="fas fa-file-alt text-4xl"></i>
    <span className="text-xl">Generate Formal CV</span>
  </NavLink>

  {/* One Column CV - Fresh Green/Teal */}
  <NavLink
    to="/viewFormalCV2"
    className="w-full p-6 h-[180px] rounded-xl text-white font-semibold tracking-wide
      shadow-[0_0_15px_rgba(0,0,0,0.4)]
      hover:shadow-[0_0_25px_rgba(16,185,129,0.7)] transition-all duration-300
      hover:scale-105 bg-gradient-to-tr from-green-500 to-teal-600 border border-green-400
      flex flex-col items-center justify-center space-y-3"
  >
    <i className="fas fa-align-left text-4xl"></i>
    <span className="text-xl">Generate One Column CV</span>
  </NavLink>

  {/* Modern CV - Vibrant Pink/Purple */}
  <NavLink
    to="/viewCV"
    className="w-full p-6 h-[180px] rounded-xl text-white font-semibold tracking-wide
      shadow-[0_0_15px_rgba(0,0,0,0.4)]
      hover:shadow-[0_0_25px_rgba(236,72,153,0.7)] transition-all duration-300
      hover:scale-105 bg-gradient-to-tr from-pink-500 to-purple-600 border border-pink-400
      flex flex-col items-center justify-center space-y-3"
  >
    <i className="fas fa-magic text-4xl"></i>
    <span className="text-xl">Generate Modern CV</span>
  </NavLink>
</div>

</div>
    </div>
  );
};

export default Home;
