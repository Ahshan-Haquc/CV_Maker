import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

const SignupAdmin = () => {
    const [input, setInput] = useState({ email: "", password: "", confirmPassword: "" });
    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInput(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.email || !input.password || !input.confirmPassword) {
            toastShow("You have to fill all fields")
        }
        input.password.length < 8 && toastShow("Minimum 8 digit password is required.");
        input.password !== input.confirmPassword && toastShow("Password is not matched");
    }

    const toastShow = (message) => {
        toast.error(message, {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    return (
        <>
            <div className="h-screen w-screen flex justify-center items-center center">
                <div className="h-[300px] md:h-[400px] w-[350px] md:w-[400px] p-4 bg-white border border-gray-200 rounded-lg shadow-lg flex flex-col items-center justify-evenly">
                    <h1 className="text-center text-2xl font-bold mb-4">Admin Sign Up</h1>
                    <form
                        method="post"
                        onSubmit={handleSubmit}
                        className="w-full flex flex-col items-center"
                    >
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full p-2 my-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            required
                            name="email"
                            onChange={handleInput}
                        />
                        <p className="text-red-600 text-sm text-left w-full">invalid email</p>
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full p-2 my-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            required
                            name="password"
                            onChange={handleInput}
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="w-full p-2 my-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            required
                            name="confirmPassword"
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
        </>
    );
};

export default SignupAdmin;
