import React, { useEffect, useState } from "react";
import { useAuthUser } from "../../context/AuthContext";
import { useUserCV } from "../../context/UserCVContext";
import deleteProject from "../../controllers/deleteItems";

const AddSection = () => {
  const { user } = useAuthUser();
  const { userCV, setUserCV } = useUserCV();

  useEffect(() => {
    console.log("New section added.");
  }, [userCV]);

  const [formValue, setFormValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInput = (e) => {
    setFormValue(e.target.value);
  };

  // Step 1: Create submitData function
  const submitData = async () => {
    if (!formValue.trim()) return;
    setLoading(true);
    setError("");
    try {
      // Step 2: Call your API
      const response = await fetch("http://localhost:3000/addNewSection", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sectionName: formValue,
          userId: user?.id, // pass user id if needed
        }),
      });
      if (!response.ok) throw new Error("Failed to add section");
      const data = await response.json();

      setFormValue("");
    } catch (err) {
      setError("error in catch");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 h-full min-w-full overflow-x-hidden">
      <div className="text-2xl text-black font-bold">
        <i className="fas fa-trophy mr-2"></i>Add New Section
      </div>

      <div className="mt-3 flex flex-col flex-wrap gap-3">
        <input
          type="text"
          name="newSectionName"
          value={formValue}
          onChange={handleInput}
          placeholder="Enter your new section name"
          className="h-12 w-full border border-gray-400 rounded-md p-2 text-xl block"
        />

        <div className="flex justify-end">
          <button
            className="h-12 w-[200px] text-white bg-gray-600 hover:bg-gray-700 border border-gray-400 rounded-md p-2 text-xl block"
            onClick={submitData}
            disabled={loading}
          >
            <i className="fas fa-plus mr-2"></i>
            {loading ? "Adding..." : "Add"}
          </button>
        </div>
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </div>

      <div className="text-2xl mt-8 font-bold mb-4">
        <i className="fa-solid fa-pen-nib mr-2"></i>Add info to your section
      </div>
      {/* section names will show here */}
      <div className="flex gap-4">
        {(userCV.sections || []).map((section) => (
          <div
            key={section.id}
            className="h-12 min-w-24 max-w-fit p-3 bg-[#DCA06D] rounded-md text-white font-bold center hover:scale-105 hover:cursor-pointer"
          >
            {section.name}
            <i className="fa-solid fa-xmark pl-2 hover:text-red-500"></i>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddSection;