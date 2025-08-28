import React, { useState, useEffect } from "react"; // Import useEffect
import { useAuthUser } from "../../context/AuthContext";
import { useUserCV } from "../../context/UserCVContext"; // Assuming you have this context for userCV data

const Profile = () => {
  const { user } = useAuthUser();
  const { userCV } = useUserCV(); // Get userCV data
  const [inputValue, setInputValue] = useState({ name: "", profession: "" });
  const [image, setImage] = useState(null);

  // Use useEffect to set initial input values from userCV data
  useEffect(() => {
    if (userCV) {
      setInputValue({
        name: userCV.name || "", // Initialize with existing name, or empty string
        profession: userCV.profession || "", // Initialize with existing profession, or empty string
      });
    }
  }, [userCV]); // Re-run when userCV changes

  const handleInput = (e) => {
    setInputValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async () => {
    // You might want to remove the image validation here if it's optional on update
    // or provide a way for the user to keep the existing image if not uploading a new one.
    // For now, I'll keep the existing check but be mindful of its impact on updates.
    if (!inputValue.name || !inputValue.profession || !image) {
      alert("All fields including image are required.");
      return;
    }

    const formData = new FormData();
    formData.append("userId", user._id);
    formData.append("name", inputValue.name);
    formData.append("profession", inputValue.profession);
    if (image) {
      // Only append image if a new one is selected
      formData.append("photo", image);
    }

    try {
      const res = await fetch("https://profilegen-cv-maker.vercel.app/updateUserProfile", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.message);
      } else {
        alert("Failed: " + data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Upload error.");
    }
  };

  return (
    <div className="p-4 h-full min-w-full">
      <div className="text-2xl text-[#213448] font-bold">
        <i className="fas fa-user mr-2"></i>Add Basic Info
      </div>
      <div className="mt-3 flex flex-col gap-3">
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          className="h-12 border border-gray-400 rounded-md p-2 text-xl"
          onChange={handleInput}
          value={inputValue.name} // Controlled component: value comes from state
        />
        <input
          type="text"
          name="profession"
          placeholder="Enter your profession"
          className="h-12 border border-gray-400 rounded-md p-2 text-xl"
          onChange={handleInput}
          value={inputValue.profession} // Controlled component: value comes from state
        />
        <label className="flex items-center gap-3 h-12 border border-gray-500 rounded-md px-4 text-xl cursor-pointer hover:bg-gray-100 justify-center">
          <i className="fas fa-upload"></i>
          {image ? (
            `You selected: ${image.name} `
          ) : (
            <span>Choose your photo</span>
          )}
          <input type="file" className="hidden" onChange={handleImageChange} />
        </label>
        <button
          className="h-12 w-[200px] bg-gray-600 hover:bg-gray-700 text-white rounded-md p-2 text-xl"
          onClick={handleSubmit}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default Profile;
