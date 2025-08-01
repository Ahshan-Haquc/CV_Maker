import React, { useState, useEffect } from "react";
import { useAuthUser } from "../../context/AuthContext";
import { useUserCV } from "../../context/UserCVContext";
import deleteProject from "../../controllers/deleteItems";

const Activities = () => {
  const { user } = useAuthUser();
  const { userCV, setUserCV } = useUserCV();
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    console.log("Activities page updated");
  }, [userCV]);

  // Handle input
  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  // Submit to backend
  const submitData = async () => {
    try {
      const response = await fetch("http://localhost:3000/updateUserActivities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user._id,
          activities: inputValue,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        setUserCV(data.updatedCV);
        setInputValue(""); // Clear input after submit
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log("Error in submission:", error);
      alert("Not updated");
    }
  };

  return (
    <div className="p-4 h-full min-w-full overflow-x-hidden">
      <div className="text-2xl text-blue-700 font-bold mb-4">
        <i className="fas fa-futbol mr-2"></i>Add Your Activities
      </div>

      <div className="flex flex-col gap-3">
        <input
          type="text"
          name="activities"
          value={inputValue}
          onChange={handleInput}
          placeholder="Enter your activity"
          className="h-12 w-full border border-gray-400 rounded-md p-2 text-xl"
        />

        <div className="flex justify-end">
          <button
            onClick={submitData}
            className="h-12 w-[200px] text-white bg-gray-600 hover:bg-gray-700 border border-gray-400 rounded-md p-2 text-xl"
          >
            <i className="fas fa-plus mr-2"></i>Add
          </button>
        </div>
      </div>

      <div className="text-2xl mt-8 text-red-700 font-bold mb-4">
        <i className="fas fa-trash-alt mr-2"></i>Delete Your Activities
      </div>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300">
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Serial
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Activity
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {userCV?.activities?.map((activity, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-4 px-6 text-sm text-gray-700">{index + 1}</td>
                <td className="py-4 px-6 text-sm text-gray-700">{activity}</td>
                <td className="py-4 px-6 text-sm text-gray-700">
                  <button
                    className="px-4 py-2 font-semibold text-white bg-red-600 rounded-md hover:bg-red-700"
                    onClick={() => deleteProject(user._id, "activities", index, setUserCV)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Activities;
