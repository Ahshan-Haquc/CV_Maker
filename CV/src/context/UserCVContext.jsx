// UserCVContext.jsx
import React, { useState, useEffect } from "react";
import { createContext, useContext } from "react";
import { useAuthUser } from "./AuthContext";
import Loading from "../commonComponents/Loading";

export const CVcontext = createContext();

export const CVprovider = ({ children }) => {
  const { user } = useAuthUser();
  const [userCV, setUserCV] = useState(null);

  // useEffect(() => {
  //   const fetchUserCV = async () => {
  //     if (!user || !user._id) return;

  //     try {
  //       const res = await fetch(`${import.meta.env.VITE_API_URL}/viewCV`, {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         credentials: "include",
  //         body: JSON.stringify({ userId: user._id }),
  //       });

  //       if (res.ok) {
  //         const data = await res.json();
  //         setUserCV(data.userCV);
  //       } else {
  //         console.error("Failed to fetch user CV");
  //       }
  //     } catch (err) {
  //       console.error("CV Fetch Error:", err);
  //     }
  //   };

  //   fetchUserCV();
  // }, [user]);

  // if (user === undefined) return <Loading/>;

  return <CVcontext.Provider value={{ userCV, setUserCV }}>{children}</CVcontext.Provider>;
};

export const useUserCV = () => useContext(CVcontext);
