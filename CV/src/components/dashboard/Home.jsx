import { useAuthUser } from "../../context/AuthContext";
import { useUserCV } from "../../context/UserCVContext";
import welcomeImage from "../../assets/Welcome.png";
import { NavLink } from "react-router-dom";
import axios from 'axios'
import { toast } from 'react-toastify';

// for lottie animation 
import Lottie from "lottie-react";
import animationData from "../../assets/homePageAnimation.json";

import SectionBox from "./home/SectionBox";
import { useState } from "react";
import Loading from "../../commonComponents/Loading";

const Home = () => {
  const [loading, setLoading] = useState(false);

  const { user } = useAuthUser();
  const { userCV, setUserCV } = useUserCV();

  const username = user?.email ? user.email.split("@")[0] : "";

  const knownArrayFields = [
    "projects",
    "experience",
    "education",
    "acheivement",
    "activities",
    "reference",
    "otherSection"
  ];

  const handleSectionDelete = async (sectionName) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/deleteMainSectionContentInside",
        { sectionName },
        { withCredentials: true }
      );

      const data = response.data;

      toast.success(data.message)
      setUserCV(data.updatedCV);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong in catch");
    }
  };


  return (
    <>
      {/* loading showing */}
      {loading && <Loading loadingMessage="Loading..." />}
      <div className="h-full w-full pb-30 flex flex-col justify-center items-center  relative">

        <div className="flex  justify-center items-center">
          {/* <img src={welcomeImage} alt="Welcome" className="h-[200px] w-[200px] block" /> */}
          <div className="flex justify-center items-center ">
            <Lottie animationData={animationData} className="h-[300px] w-[300px] block" />
          </div>

          <div className="flex flex flex-col justify-center items-center">
            {/* <div className="text-gray-500 text-sm">Welcome {username}, to...</div> */}
            {/* <div className="text-gray-500 text-md">to</div> */}
            <div className="text-4xl font-bold">ProFileGen</div>
            <div className="text-sm">Build Resumes/CV That Speak for Your Skills</div>
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
      hover:scale-105 bg-gradient-to-tr from-pink-500 to-purple-600 border border-pink-400
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
      hover:scale-105 bg-gradient-to-tr from-pink-500 to-purple-600 border border-pink-400
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

        {/* customize section div  */}
        <div className="w-full p-6 my-12 border border-gray-300 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">Delete Sections</h2>

          <div className="flex flex-wrap gap-4">
            {knownArrayFields.map((sectionName, index) => {
              return (
                <SectionBox
                  sectionName={sectionName}
                  key={index}
                  order={3}
                  onDelete={() => { handleSectionDelete(sectionName) }}
                  onOrderChange={(newOrder) => console.log("New order:", newOrder)}
                />
              )
            })}

          </div>
        </div>

      </div>
    </>
  );
};

export default Home;
