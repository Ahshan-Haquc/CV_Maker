import { useAuthUser } from "../../context/AuthContext";
import { useUserCV } from "../../context/UserCVContext";
import welcomeImage from "../../assets/Welcome.png";
import { NavLink } from "react-router-dom";
import axios from 'axios'
import AOS from "aos";
import "aos/dist/aos.css";
import { toast } from 'react-toastify';

// for lottie animation 
import Lottie from "lottie-react";
import animationData from "../../assets/homePageAnimation.json";

import SectionBox from "./home/SectionBox";
import { useEffect, useState } from "react";
import Loading from "../../commonComponents/Loading";
import OnboardingSteps from "../../sections/OnboardingSteps";
import Features from "../../commonComponents/Features";

const Home = () => {
  const [loading, setLoading] = useState(false);

  const { user } = useAuthUser();
  const { userCV, setUserCV } = useUserCV();

  const username = user?.email ? user.email.split("@")[0] : "";

  const knownArrayFields = [
    { name: "projects", willVisible: userCV?.projects?.length > 0 ? true : false },
    { name: "experience", willVisible: userCV?.experience?.length > 0 ? true : false },
    { name: "education", willVisible: userCV?.education?.length > 0 ? true : false },
    { name: "acheivement", willVisible: userCV?.acheivement?.length > 0 ? true : false },
    { name: "activities", willVisible: userCV?.activities?.length > 0 ? true : false },
    { name: "reference", willVisible: userCV?.reference?.length > 0 ? true : false },
    { name: "otherSection", willVisible: userCV?.otherSection?.length > 0 ? true : false }
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

  // for maintaining order count 
  let count = 0;

  // for animation 
  useEffect(() => {
    AOS.init({ duration: 1000 }); // animation speed (ms)
  }, []);

  return (
    <>
      {/* loading showing */}
      {loading && <Loading loadingMessage="Loading..." />}
      <div className="h-full w-full pb-4 flex flex-col justify-center items-center  relative">

        {/* title text  */}
        <div className="flex flex-col lg:flex-row items-center justify-center w-full px-4 mt-6 gap-4" data-aos="zoom-in" data-aos-duration="8000">
          <Lottie
            animationData={animationData}
            className="h-[250px] w-[250px] sm:h-[300px] sm:w-[300px]"
          />
          <div className="text-center lg:text-left">
            <h2 className="text-4xl font-extrabold text-gradient bg-gradient-to-r from-[#4F1C51] via-[#7B2FF2] to-[#F357A8] bg-clip-text text-transparent">ProFileGen</h2>
            <div className="text-sm sm:text-base text-gray-400">
              Build Resumes/CV That Speak for Your Skills
            </div>
          </div>
        </div>

        {/* box div */}
        <div className="w-full max-w-7xl p-4 ">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <NavLink
              to="/viewFormalCV"
              className="w-full p-6 h-[180px] rounded-xl text-white font-semibold tracking-wide
      shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105
      bg-gradient-to-tr from-pink-500 to-purple-600 border border-pink-400
      flex flex-col items-center justify-center space-y-3"
              data-aos="fade-up" data-aos-duration="8000"
            >
              <i className="fas fa-file-alt text-3xl sm:text-4xl"></i>
              <span className="text-lg sm:text-xl text-center">Generate Formal CV</span>
            </NavLink>

            <NavLink
              to="/viewFormalCV2"
              className="w-full p-6 h-[180px] rounded-xl text-white font-semibold tracking-wide
      shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105
      bg-gradient-to-tr from-pink-500 to-purple-600 border border-pink-400
      flex flex-col items-center justify-center space-y-3"
              data-aos="fade-up" data-aos-duration="8000"
            >
              <i className="fas fa-align-left text-3xl sm:text-4xl"></i>
              <span className="text-lg sm:text-xl text-center">Generate One Column CV</span>
            </NavLink>

            <NavLink
              to="/viewCV"
              className="w-full p-6 h-[180px] rounded-xl text-white font-semibold tracking-wide
      shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105
      bg-gradient-to-tr from-pink-500 to-purple-600 border border-pink-400
      flex flex-col items-center justify-center space-y-3"
              data-aos="fade-up" data-aos-duration="8000"
            >
              <i className="fas fa-magic text-3xl sm:text-4xl"></i>
              <span className="text-lg sm:text-xl text-center">Generate Modern CV</span>
            </NavLink>
          </div>
        </div>


        {/* customize section div  */}
        <div className="w-full max-w-7xl px-4 py-2 md:py-6 my-10  rounded-xl">
          <h2 className="text-4xl font-extrabold text-center mb-8 text-gradient bg-gradient-to-r from-[#4F1C51] via-[#7B2FF2] to-[#F357A8] bg-clip-text text-transparent" data-aos="zoom-in">Customize Sections</h2>

          <div className="flex flex-wrap gap-4 justify-center " data-aos="zoom-in" data-aos-delay="200">
            {knownArrayFields.map((section, index) => {
              return (
                section.willVisible === true && (
                  <SectionBox
                    sectionName={section.name}
                    key={index}
                    order={count = count + 1}
                    onDelete={() => { handleSectionDelete(section.name) }}
                    onOrderChange={(newOrder) => console.log("New order:", newOrder)}
                  />
                )
              );
            })}
          </div>
        </div>

        <OnboardingSteps />

        {/* Features of this website */}
        <Features />


      </div>
    </>
  );
};

export default Home;
