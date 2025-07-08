import { useState, createContext, useContext } from "react";

export const SkillContext = createContext();

export const SkillContextProvider = ({ children }) => {
  const [skills, setSkills] = useState({
    Frontend: [],
    Backend: [],
    Database: [],
    Technologies: [],
    SoftSkills: [],
    Others: [],
  });

  return (
    <SkillContext.Provider value={{ skills, setSkills }}>
      {children}
    </SkillContext.Provider>
  );
};

export const useSkillsContext = () => useContext(SkillContext);
