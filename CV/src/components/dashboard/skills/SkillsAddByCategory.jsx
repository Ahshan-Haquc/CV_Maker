import React from "react";
import SkillsAdd from "./SkillsAdd";
import { useState, useEffect } from "react";
import { useSkillsContext } from "../../../context/SkillsAddingContext";

const SkillsAddByCategory = ({ category, values }) => {
  const [inputBoxShowingStatus, setInputBoxShowingStatus] = useState(false);
  const { skills, setSkills } = useSkillsContext();
  const showNewInputForAddSkill = () => {
    setInputBoxShowingStatus(!inputBoxShowingStatus);
  };

  // generally adding skills in context
  const handleInput = (e) => {
    const categoryName = e.target.name;
    const value = e.target.value;

    setSkills((prev) => ({
      ...prev,
      [categoryName]: prev.push(value),
    }));
  };

  // manually typed skills adding in context
  const AddNewSkill = () => {};
  return (
    <div>
      <div className="mt-4 text-lg p-1 bg-green-100">
        <i class="fa-solid fa-list"></i> {category}
      </div>
      <div className="py-3 flex flex-wrap gap-3">
        {values.map((skillName, index) => {
          let number = index + 1;
          return (
            <SkillsAdd
              category={category}
              name={skillName}
              identifier={category}
              num={number}
              key={index}
            />
          );
        })}
      </div>
      <button
        className="h-fit w-fit py-1 px-3 bg-black text-white rounded-md hover:bg-gray-600"
        onClick={showNewInputForAddSkill}
      >
        {inputBoxShowingStatus ? (
          <i class="fa-solid fa-minus"></i>
        ) : (
          <i class="fa-solid fa-plus"></i>
        )}

        <span className="ml-2">
          {inputBoxShowingStatus ? "Hide" : "Add more"}
        </span>
      </button>
      {/* showing add new slill input box  */}
      <div
        className={` ${
          inputBoxShowingStatus ? "inline" : "hidden"
        } duration-500`}
      >
        <input
          type="text"
          className="h-8 w-fit ml-2 p-2 border border-gray-700 rounded-lg"
        />
        <button
          className="h-fit w-fit ml-2 py-1 px-3 bg-green-400 text-white rounded-md hover:bg-gray-600"
          onClick={AddNewSkill}
        >
          <i class="fa-solid fa-plus"></i>
          <span className="ml-2">Add</span>
        </button>
      </div>
    </div>
  );
};

export default SkillsAddByCategory;
