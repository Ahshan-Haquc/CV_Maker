// UserCVContext.jsx
import React, { useState, useEffect } from "react";
import { createContext, useContext } from "react";
import { useAuthUser } from "./AuthContext";

export const CVcontext = createContext();

export const CVprovider = ({ children }) => {
  const { user } = useAuthUser();
  const [userCV, setUserCV] = useState(null);

  useEffect(() => {
    console.log("user in cv is :", user);
    const fetchUserCV = async () => {
      if (!user || !user._id) return;

      try {
        const res = await fetch("https://profilegen-cv-maker.vercel.app/viewCV", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ userId: user._id }),
        });

        if (res.ok) {
          const data = await res.json();
          setUserCV(data.userCV);
          console.log("user cv is: now :", userCV);
        } else {
          console.error("Failed to fetch user CV");
        }
      } catch (err) {
        console.error("CV Fetch Error:", err);
      }
    };

    fetchUserCV();
  }, [user]);

  if (user === undefined) return <div>Loading CV...</div>;

  return <CVcontext.Provider value={{ userCV, setUserCV }}>{children}</CVcontext.Provider>;
};

export const useUserCV = () => useContext(CVcontext);
