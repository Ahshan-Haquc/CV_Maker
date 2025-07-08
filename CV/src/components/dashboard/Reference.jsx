import React, { useEffect, useState } from "react";
import { useAuthUser } from "../../context/AuthContext";
import { useUserCV } from "../../context/UserCVContext";
import deleteProject from "../../controllers/deleteItems";

const Reference = () => {
  const { user } = useAuthUser();
  const { userCV, setUserCV } = useUserCV();

  const [referenceValues, setReferenceValues] = useState({
    referenceName: "",
    referenceCompany: "",
    referenceEmail: "",
    referencePhone: "",
  });

  useEffect(() => {
    console.log("Reference section updated.");
  }, [userCV]);

  // Handle input fields
  const handleInput = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setReferenceValues((prevValues) => ({
      ...prevValues,
      [fieldName]: fieldValue,
    }));
  };

  // Submit reference to backend
  const submitData = async () => {
    try {
      const response = await fetch("http://localhost:3000/updateUserReference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user._id,
          referenceName: referenceValues.referenceName,
          referenceCompany: referenceValues.referenceCompany,
          referenceEmail: referenceValues.referenceEmail,
          referencePhone: referenceValues.referencePhone,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setUserCV(data.updatedCV);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log("Error submitting reference:", error);
      alert("Not updated");
    }
  };

  return (
    <div className="p-4 h-full min-w-full overflow-x-hidden">
      <div className="text-2xl text-blue-700 font-bold ">
        <i className="fas fa-user-check mr-2"></i>Add Your Reference
      </div>

      <div className="mt-3 flex flex-col flex-wrap gap-3">
        <input
          type="text"
          name="referenceName"
          onChange={handleInput}
          placeholder="Reference Name"
          className="h-12 w-full border border-gray-400 rounded-md p-2 text-xl"
        />
        <input
          type="text"
          name="referenceCompany"
          onChange={handleInput}
          placeholder="Company / Organization"
          className="h-12 w-full border border-gray-400 rounded-md p-2 text-xl"
        />
        <input
          type="email"
          name="referenceEmail"
          onChange={handleInput}
          placeholder="Reference Email"
          className="h-12 w-full border border-gray-400 rounded-md p-2 text-xl"
        />
        <input
          type="text"
          name="referencePhone"
          onChange={handleInput}
          placeholder="Reference Phone Number"
          className="h-12 w-full border border-gray-400 rounded-md p-2 text-xl"
        />
        <div className="flex justify-end">
          <button
            className="h-12 w-[200px] text-white bg-blue-600 hover:bg-blue-700 rounded-md text-xl"
            onClick={submitData}
          >
            Add
          </button>
        </div>
      </div>

      <div className="text-2xl mt-8 text-red-700 font-bold mb-4">
        <i className="fas fa-trash mr-2"></i>Delete Reference
      </div>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300">
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase">
                #
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase">
                Name
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase">
                Company
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase">
                Email
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase">
                Phone
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {userCV?.reference?.map((ref, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-4 px-6 text-sm font-medium text-gray-900">
                  {index + 1}
                </td>
                <td className="py-4 px-6 text-sm text-gray-700">
                  {ref.referenceName}
                </td>
                <td className="py-4 px-6 text-sm text-gray-700">
                  {ref.referenceCompany}
                </td>
                <td className="py-4 px-6 text-sm text-gray-700">
                  {ref.referenceEmail}
                </td>
                <td className="py-4 px-6 text-sm text-gray-700">
                  {ref.referencePhone}
                </td>
                <td className="py-4 px-6 text-sm">
                  <button
                    className="px-4 py-2 font-semibold text-white bg-red-600 rounded-md hover:bg-red-700"
                    onClick={() =>
                      deleteProject(user._id, "reference", index, setUserCV)
                    }
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

export default Reference;
