import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="h-full min-w-[250px] bg-gray-100">
      <NavLink
        to="/home"
        className={({ isActive }) =>
          `${
            isActive ? "bg-[#ff8757]" : ""
          } p-3 text-[#213448] text-xl  border-b-[1px] border-gray-200 hover:bg-white duration-400 block`
        }
      >
        <i className="fas fa-home mr-2"></i>
        Home
      </NavLink>
      <NavLink
        to="/profile"
        className={({ isActive }) =>
          `${
            isActive ? "bg-[#ff8757]" : ""
          } p-3 text-[#213448] text-xl  border-b-[1px] border-gray-200 hover:bg-white duration-400 block`
        }
      >
        <i className="fas fa-user mr-2"></i>
        Your Profile
      </NavLink>
      <NavLink
        to="/description"
        className={({ isActive }) =>
          `${
            isActive ? "bg-[#ff8757]" : ""
          } p-3 text-[#213448] text-xl  border-b-[1px] border-gray-200 hover:bg-white duration-400 block`
        }
      >
        <i className="fas fa-align-left mr-2"></i>
        Description
      </NavLink>
      <NavLink
        to="/contact"
        className={({ isActive }) =>
          `${
            isActive ? "bg-[#ff8757]" : ""
          } p-3 text-[#213448] text-xl  border-b-[1px] border-gray-200 hover:bg-white duration-400 block`
        }
      >
        <i className="fas fa-align-left mr-2"></i>
        Contact
      </NavLink>
      <NavLink
        to="/skills"
        className={({ isActive }) =>
          `${
            isActive ? "bg-[#ff8757]" : ""
          } p-3 text-[#213448] text-xl  border-b-[1px] border-gray-200 hover:bg-white duration-400 block`
        }
      >
        <i className="fas fa-tools mr-2"></i>
        Skills
      </NavLink>
      <NavLink
        to="/projects"
        className={({ isActive }) =>
          `${
            isActive ? "bg-[#ff8757]" : ""
          } p-3 text-[#213448] text-xl  border-b-[1px] border-gray-200 hover:bg-white duration-400 block`
        }
      >
        <i className="fas fa-tasks mr-2"></i>
        Projects
      </NavLink>
      <NavLink
        to="/experience"
        className={({ isActive }) =>
          `${
            isActive ? "bg-[#ff8757]" : ""
          } p-3 text-[#213448] text-xl  border-b-[1px] border-gray-200 hover:bg-white duration-400 block`
        }
      >
        <i className="fas fa-briefcase mr-2"></i>
        Experience
      </NavLink>
      <NavLink
        to="/education"
        className={({ isActive }) =>
          `${
            isActive ? "bg-[#ff8757]" : ""
          } p-3 text-[#213448] text-xl  border-b-[1px] border-gray-200 hover:bg-white duration-400 block`
        }
      >
        <i className="fas fa-graduation-cap mr-2"></i>
        Education
      </NavLink>
      <NavLink
        to="/acheivements"
        className={({ isActive }) =>
          `${
            isActive ? "bg-[#ff8757]" : ""
          } p-3 text-[#213448] text-xl  border-b-[1px] border-gray-200 hover:bg-white duration-400 block`
        }
      >
        <i className="fas fa-trophy mr-2"></i>
        Achievements
      </NavLink>
      <NavLink
        to="/activities"
        className={({ isActive }) =>
          `${
            isActive ? "bg-[#ff8757]" : ""
          } p-3 text-[#213448] text-xl  border-b-[1px] border-gray-200 hover:bg-white duration-400 block`
        }
      >
        <i className="fas fa-futbol mr-2"></i>
        Activities
      </NavLink>
    </div>
  );
};

export default SideBar;
