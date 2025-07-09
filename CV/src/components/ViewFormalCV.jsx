import React from "react";
import { useUserCV } from "../context/UserCVContext";
import { NavLink } from "react-router-dom";

const ViewFormalCV = () => {
    const { userCV } = useUserCV(); 
  if (!userCV) return <p className="text-center text-xl">Loading...</p>;

  return (
    <>
    <div className="bg-gray-100 min-h-screen min-w-screen  p-6">
    <div className="max-w-4xl mx-auto bg-white p-8 shadow-md rounded-md text-[#213448]">
      {/* Header */}
      <div className="text-center mb-6">
        <img
          src={`http://localhost:3000/uploads/${userCV.images}`}
          alt="Profile"
          className="w-32 h-32 rounded-full mx-auto object-cover border-2 border-gray-400"
        />
        <h1 className="text-3xl font-bold mt-4">{userCV.name}</h1>
        <h2 className="text-xl text-gray-600">{userCV.profession}</h2>
      </div>

      {/* Description */}
      <div className="mb-6">
        <h3 className="text-2xl font-semibold border-b border-gray-300 pb-1">Profile Summary</h3>
        <p className="mt-2">{userCV.description}</p>
      </div>

      {/* Contact Info */}
      <div className="grid grid-cols-2 gap-4 mb-6 text-gray-700">
        <p><strong>Email:</strong> {userCV.emailId}</p>
        <p><strong>Phone:</strong> {userCV.phoneNumber}</p>
        <p><strong>LinkedIn:</strong> {userCV.linkedInId}</p>
        <p><strong>GitHub:</strong> {userCV.githubId}</p>
        <p><strong>Portfolio:</strong> {userCV.portfolioLink}</p>
        <p><strong>Address:</strong> {userCV.address}</p>
      </div>

      {/* Skills */}
      <div className="mb-6">
        <h3 className="text-2xl font-semibold border-b border-gray-300 pb-1 mb-2">Skills</h3>
        <div className="grid grid-cols-2 gap-4">
          {userCV.skills &&
            Object.entries(userCV.skills).map(([category, skillList], idx) => (
              <div key={idx}>
                <h4 className="font-bold">{category}</h4>
                <ul className="list-disc list-inside">
                  {skillList.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      </div>

      {/* Education */}
      <div className="mb-6">
        <h3 className="text-2xl font-semibold border-b border-gray-300 pb-1 mb-2">Education</h3>
        {userCV.education.map((edu, index) => (
          <div key={index} className="mb-2">
            <p className="font-bold">{edu.educationQualification}</p>
            <p>{edu.educationInstitutionName}</p>
            <p className="text-sm text-gray-600">{edu.startingDate} - {edu.endingDate}</p>
          </div>
        ))}
      </div>

      {/* Experience */}
      <div className="mb-6">
        <h3 className="text-2xl font-semibold border-b border-gray-300 pb-1 mb-2">Experience</h3>
        {userCV.experience.map((exp, index) => (
          <div key={index} className="mb-2">
            <p className="font-bold">{exp.position} at {exp.organizationName}</p>
            <p>{exp.organizationAddress}</p>
            <p className="text-sm text-gray-600">{exp.joiningDate} - {exp.endingDate}</p>
            <p>{exp.jobDescription}</p>
          </div>
        ))}
      </div>

      {/* Projects */}
      <div className="mb-6">
        <h3 className="text-2xl font-semibold border-b border-gray-300 pb-1 mb-2">Projects</h3>
        {userCV.projects.map((proj, index) => (
          <div key={index} className="mb-2">
            <p className="font-bold">{proj.projectName}</p>
            <p>{proj.projectDescription}</p>
            <p className="text-sm text-gray-600">{proj.projectToolsAndTechnologies}</p>
          </div>
        ))}
      </div>

      {/* Achievements */}
      <div className="mb-6">
        <h3 className="text-2xl font-semibold border-b border-gray-300 pb-1 mb-2">Achievements</h3>
        <ul className="list-disc list-inside">
          {userCV.acheivement.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Activities */}
      <div className="mb-6">
        <h3 className="text-2xl font-semibold border-b border-gray-300 pb-1 mb-2">Activities</h3>
        <ul className="list-disc list-inside">
          {userCV.activities.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* References */}
      <div className="mb-6">
        <h3 className="text-2xl font-semibold border-b border-gray-300 pb-1 mb-2">References</h3>
        {userCV.reference.map((ref, index) => (
          <div key={index} className="mb-2">
            <p className="font-bold">{ref.referenceName}</p>
            <p>{ref.referenceCompany}</p>
            <p>{ref.referenceEmail} | {ref.referencePhone}</p>
          </div>
        ))}
      </div>
    </div>
    </div>

    {/* back and download pdf button */}
    <div className="fixed bottom-4 right-4 h-10 w-10 rounded-full hover:bg-black bg-amber-600 text-white flex justify-center items-center">
            <i className="fa-solid fa-download"></i>
          </div>
          {/* click to go dashboard again  */}
          <NavLink
            to={"/"}
            className="fixed bottom-20 right-4 h-10 w-10 rounded-full hover:bg-black bg-amber-600 text-white flex justify-center items-center"
          >
            <i class="fa-solid fa-arrow-left"></i>
          </NavLink>
    </>
  );
};

export default ViewFormalCV;
