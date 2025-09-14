import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthUser } from "../context/AuthContext";
import "../App.css";
import toastShow from "../utils/toastShow";
const Login = () => {
  // State to hold user input
  const [formUser, setFormUser] = useState({ email: "", password: "" });
  let keyName, value;
  const navigate = useNavigate();
  const { user, setUser } = useAuthUser();

  useEffect(() => {
    document.title = "Login";
    toastShow("You do not have to varify email. so do not use your actual email and password if you are afraid.")
  }, []);

  // Handle input changes
  const handleInput = (e) => {
    keyName = e.target.name;
    value = e.target.value;
    setFormUser({ ...formUser, [keyName]: value });
  };

  // Handle login form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/userLogin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: formUser.email,
          password: formUser.password,
        }),
      });

      // if i use this then project run in vercel
      // const response = await fetch("https://profilegen-cv-maker.vercel.app/userLogin", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   credentials: "include",
      //   body: JSON.stringify({
      //     email: formUser.email,
      //     password: formUser.password,
      //   }),
      // });


      const data = await response.json();
      if (response.ok) {
        setUser(data.user); // Set user in context

        //navigating to dashboard
        if (data.user.role === "admin") {
          navigate("/adminDashboard");
        } else {
          navigate("/cvDashboard");
        }
      } else {
        toastShow("Login unsuccessful. Please try later!", "error");
      }
    } catch (err) {
      console.log("Login error in frontend :", err);
      toastShow("Login catch error.", "error");
    }
  };
  return (
    <div className="h-screen w-screen center">
      <div className="h-[300px] md:h-[400px] w-[350px] md:w-[400px] p-4 bg-white border border-gray-200 rounded-lg shadow-lg flex flex-col items-center justify-evenly">
        <h1 className="text-center text-2xl font-bold mb-4">Login</h1>
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
            className="w-full p-2 mb-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            required
            name="password"
            onChange={handleInput}
          />
          <p className="w-full mb-4 text-sm text-gray-600 text-right">
            forgot password
          </p>
          <button
            type="submit"
            className="w-full p-2 bg-[#4F1C51] text-white rounded-md hover:bg-black transition duration-200"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-600">
          Don't have an account?{" "}
          <NavLink to="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
