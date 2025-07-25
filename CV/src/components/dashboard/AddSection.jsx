import React from 'react';
import { useState } from 'react';
const AddSection = () => {
  const [formValue, setFormValue] = useState("");
  const handleInput = (e) => {
    setFormValue(e.target.value);
  }

  const submitData = () => {
    alert(formValue);
  }
  return (
    <div className="p-4 h-full min-w-full overflow-x-hidden">
      <div className="text-2xl text-black font-bold">
        <i className="fas fa-trophy mr-2"></i>Add New Section
      </div>

      <div className="mt-3 flex flex-col flex-wrap gap-3">
        <input
          type="text"
          name="newSectionName"
          onChange={handleInput}
          placeholder="Enter your new section name"
          className="h-12 w-full border border-gray-400 rounded-md p-2 text-xl block"
        />

        <div className="flex justify-end">
          <button
            className="h-12 w-[200px] text-white bg-gray-600 hover:bg-gray-700 border border-gray-400 rounded-md p-2 text-xl block"
            onClick={submitData}
          >
            <i className="fas fa-plus mr-2"></i>Add
          </button>
        </div>
      </div>

      <div className="text-2xl mt-8  font-bold mb-4">
        <i className="fa-solid fa-pen-nib mr-2"></i>Add info to your section
      </div>
      {/* section names will show here */}
      <div className="">
        <div className="h-12 w-24 bg-[#DCA06D] rounded-md text-white font-bold center hover:scale-105 hover:cursor-pointer">
          Language
        </div>
      </div>


    </div>
  );
};

export default AddSection;