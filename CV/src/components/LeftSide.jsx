import React from "react";
import myImage from "../assets/MyImage.jpg";
import Title from "../components/Headings";
import ContactText from "../components/ContactText";
import Skills from "../components/Skills";
import { useUserCV } from "../context/UserCVContext";

const LeftSide = () => {
  const { userCV } = useUserCV();
  return (
    <div className="min-w-[400px]  min-h-full  bg-[#213448] flex flex-col items-center">
      {/* image  */}
      <div className="h-[250px] w-[250px] rounded-full mt-8">
        <img
          src={`http://localhost:3000/uploads/${userCV?.images}`}
          className="object-cover h-full w-full rounded-full"
          alt="Profile"
        />
      </div>

      {/* contact */}
      <div className="w-full h-fit mt-10 pl-6 ">
        <Title title="Contact" />
        <div className="">
          <ContactText text={userCV?.phoneNumber} logoName="fa-phone-flip" />
          <ContactText text={userCV?.emailId} logoName="fa-user" />
          <ContactText text={userCV?.linkedInId} logoName="fa-user" />
          <ContactText text={userCV?.githubId} logoName="fa-user" />
          <ContactText text={userCV?.portfolioLink} logoName="fa-user" />
          <ContactText text={userCV?.address} logoName="fa-location-dot" />
        </div>
      </div>
      {/* skills */}
      <div className="w-full h-fit mt-12 pl-6 ">
        <Title title="Skills" />
        <div className="pl-2">
          <Skills
            skillTitle="Frontend"
            skillNames={[
              "HTML",
              "CSS",
              "JavaScript",
              "Tailwind CSS",
              "React.js",
            ]}
          />
          <Skills
            skillTitle="Backend"
            skillNames={["Node.js", "Express.js", "RESTApi"]}
          />
          <Skills skillTitle="Database" skillNames={["MongoDB", "MySQL"]} />
          <Skills
            skillTitle="Technologies"
            skillNames={[
              "Figma ( UI/UX Design )",
              "Postman ( API Testing )",
              "Chatgpt",
              "VS code",
            ]}
          />
        </div>
      </div>
      {/* reference */}
      <div className="w-full h-fit mt-12 pl-6 ">
        <Title title="Reference" />
        <div className="text-white ml-11 my-8">
          <div className="text-2xl font-bold">Ms. Babe Sultana</div>
          <div className="text-xl ">Senior Lecturer, CSE</div>
          <div className="text-xl ">Green University of Bangladesh</div>
          <div className="text-xl ">babesultana@cse.green.edu.bd</div>
        </div>
      </div>
    </div>
  );
};

export default LeftSide;
