import React from "react";

const UserCVDisplayLayout2 = ({ userCV }) => {
  const {
    name,
    profession,
    images,
    description,
    phoneNumber,
    emailId,
    linkedInId,
    githubId,
    portfolioLink,
    address,
    skills,
    projects,
    experience,
    education,
    acheivement,
    activities,
    reference,
  } = userCV;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <div className="text-center">
        <img
          src={`http://localhost:3000/uploads/${images}`}
          alt="Profile"
          className="w-32 h-32 mx-auto rounded-full object-cover"
        />
        <h1 className="text-3xl font-bold mt-4">{name}</h1>
        <h2 className="text-lg text-gray-600">{profession}</h2>
        <p className="text-sm text-gray-600">{address}</p>
        <div className="flex justify-center gap-4 mt-2 text-sm text-blue-600">
          <a href={`mailto:${emailId}`}>{emailId}</a>
          <a href={linkedInId}>LinkedIn</a>
          <a href={githubId}>GitHub</a>
          <a href={portfolioLink}>Portfolio</a>
        </div>
      </div>

      <hr className="my-6" />

      <section>
        <h2 className="text-xl font-semibold">About Me</h2>
        <p className="text-gray-700 mt-2">{description}</p>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">Skills</h2>
        {skills &&
          Object.entries(skills).map(([category, skillList]) => (
            <div key={category} className="mt-2">
              <h3 className="font-semibold text-gray-700">{category}</h3>
              <p className="text-gray-600">{skillList.join(", ")}</p>
            </div>
          ))}
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">Projects</h2>
        {projects.map((proj, idx) => (
          <div key={idx} className="mt-2">
            <h3 className="font-bold">{proj.projectName}</h3>
            <p>{proj.projectDescription}</p>
            <p className="text-sm text-gray-500">{proj.projectToolsAndTechnologies}</p>
          </div>
        ))}
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">Experience</h2>
        {experience.map((exp, idx) => (
          <div key={idx} className="mt-2">
            <h3 className="font-bold">{exp.position} @ {exp.organizationName}</h3>
            <p className="text-sm text-gray-500">{exp.joiningDate} - {exp.endingDate}</p>
            <p>{exp.jobDescription}</p>
          </div>
        ))}
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">Education</h2>
        {education.map((edu, idx) => (
          <div key={idx} className="mt-2">
            <h3 className="font-bold">{edu.educationQualification}</h3>
            <p>{edu.educationInstitutionName}</p>
            <p className="text-sm text-gray-500">{edu.startingDate} - {edu.endingDate}</p>
          </div>
        ))}
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">Achievements</h2>
        <ul className="list-disc ml-6">
          {acheivement.map((ach, idx) => (
            <li key={idx}>{ach}</li>
          ))}
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">Activities</h2>
        <ul className="list-disc ml-6">
          {activities.map((act, idx) => (
            <li key={idx}>{act}</li>
          ))}
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">References</h2>
        {reference.map((ref, idx) => (
          <div key={idx} className="mt-2">
            <h3 className="font-semibold">{ref.referenceName}</h3>
            <p>{ref.referenceCompany}</p>
            <p>{ref.referenceEmail}</p>
            <p>{ref.referencePhone}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default UserCVDisplayLayout2;
