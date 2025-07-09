import React from "react";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useUserCV } from "../context/UserCVContext";

const ViewCV = () => {
  const { userCV, setUserCV } = useUserCV();
  useEffect(() => {
    document.title = "CV";
  }, [userCV]);
  return (
    <>
      <div className="fixed bottom-4 right-4 h-10 w-10 rounded-full hover:bg-black bg-amber-600 text-white flex justify-center items-center">
        <i className="fa-solid fa-download"></i>
      </div>
      {/* click to go dashboard again  */}
      <NavLink
        to={"/"}
        className="fixed bottom-20 right-4 h-10 w-10 rounded-full hover:bg-black bg-amber-600 text-white flex justify-center items-center"
      >
        <i class="fa-solid fa-arrow-left"></i>
      </NavLink>
      <div className=" p-[100px] bg-gray-100">
      <div id="cv-content" className="flex">
      <LeftSide />
      <RightSide />
      </div>
      </div>
    </>
  );
};

export default ViewCV;
