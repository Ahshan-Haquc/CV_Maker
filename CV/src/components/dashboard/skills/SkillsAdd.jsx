import React from "react";
import { useSkillsContext } from "../../../context/SkillsAddingContext";

const SkillsAdd = ({ name, identifier, num, category }) => {
  const { setSkills } = useSkillsContext();

  // generally adding skills in context
  const handleInput = (e) => {
    const categoryName = e.target.getAttribute("categoryname");
    const value = e.target.value;

    setSkills((prev) => ({
      ...prev,
      [categoryName]: [...prev[categoryName], value],
    }));
    alert(categoryName, value);
  };

  return (
    <div className="h-8 w-fit p-2 border border-green-200 rounded-lg flex items-center gap-2">
      <input
        type="checkbox"
        id={identifier + num}
        name={identifier + num}
        categoryname={category}
        value={name}
        onChange={handleInput}
      />
      <label for={identifier + num} className="text-lg">
        {" "}
        {name}
      </label>
    </div>
  );
};

export default SkillsAdd;
