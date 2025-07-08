import React from "react";
import SkillsAddByCategory from "./skills/SkillsAddByCategory";

const Skills = () => {
  const frontendSkillNames = [
    "HTML",
    "CSS",
    "JavaScript",
    "React.js",
    "Next.js",
    "EJS",
    "Tailwind CSS",
    "Boostrap",
  ];
  const backendSkillNames = [
    "Node.js",
    "Express.js",
    "PHP",
    "Laravel",
    "Python",
    "Django",
  ];
  const uIuXNames = ["Figma", "Canva", "AdobeXD"];
  const databaseNames = ["MongoDB", "MySQL", "PostgreSQL"];
  const toolsAndTechnologiesNames = [
    "Postman",
    "Git & Github",
    "Docker",
    "OpenAI",
    "VS code",
  ];
  const SoftskillName = [
    "MS Office",
    "Video Edditing",
    "2D Animation",
    "Photo Editing",
  ];

  //function for storing skills in db
  const submitData = () => {};
  return (
    <div className="p-4 h-full min-w-full ">
      <div className="text-2xl text-[#213448] font-bold ">
        <i className="fas fa-tools mr-2"></i>Add Your Skill Set
      </div>
      <SkillsAddByCategory category="Frontend" values={frontendSkillNames} />
      <SkillsAddByCategory category="Backend" values={backendSkillNames} />
      <SkillsAddByCategory category="UI/UX" values={uIuXNames} />
      <SkillsAddByCategory category="Database" values={databaseNames} />
      <SkillsAddByCategory
        category="Tools And Technology"
        values={toolsAndTechnologiesNames}
      />
      <SkillsAddByCategory category="SoftSkills" values={SoftskillName} />
      <button
        className="h-12 w-[200px] mt-8 text-white bg-gray-600 hover:bg-gray-700 border border-gray-400 rounded-md p-2 text-xl block"
        onClick={submitData}
      >
        Update
      </button>
    </div>
  );
};

export default Skills;
