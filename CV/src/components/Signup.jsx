import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../App.css";
const Signup = () => {
  // State to hold user input
  const [user, setUser] = useState({ email: "", password: "" });
  let keyName, value;
  const navigate = useNavigate();

  // Set the document title when the component mounts
  useEffect(() => {
    document.title = "Sign Up";
  }, []);

  // Handle input changes
  const handleInput = (e) => {
    keyName = e.target.name;
    value = e.target.value;
    setUser({ ...user, [keyName]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/userSignup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          password: user.password,
        }),
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        alert("Signup successful!");
        navigate("/login");
      } else {
        alert(data.error || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("An error occurred during signup. Please try again.");
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center center">
      <div className="h-[300px] md:h-[400px] w-[350px] md:w-[400px] p-4 bg-white border border-gray-200 rounded-lg shadow-lg flex flex-col items-center justify-evenly">
        <h1 className="text-center text-2xl font-bold mb-4">Sign Up</h1>
        <form
          method="post"
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center"
        >
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            required
            name="email"
            onChange={handleInput}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            required
            name="password"
            onChange={handleInput}
          />
          <button
            type="submit"
            className="w-full p-2 bg-[#37B7C3] text-white rounded-md hover:bg-blue-600 transition duration-200"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <NavLink to="/login" className="text-blue-500 hover:underline">
            Log in
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Signup;
