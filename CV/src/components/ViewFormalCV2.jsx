import React, { useRef } from "react";
import { useUserCV } from "../context/UserCVContext";
import { NavLink } from "react-router-dom";
import jsPDF from "jspdf";
import domtoimage from "dom-to-image";

const UserCVDisplayLayout1 = () => {
  const { userCV } = useUserCV();
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

  // for downloading pdf 
  const printRef = useRef(null);

  if (!userCV) return <p className="text-center text-xl">Loading...</p>;

  const handleDownloadPdf = async () => {
    const element = printRef.current;
    const scale = 2;

    try {
      const dataUrl = await domtoimage.toPng(element, {
        width: element.offsetWidth * scale,
        height: element.offsetHeight * scale,
        style: {
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          width: `${element.offsetWidth * scale}px`,
          height: `${element.offsetHeight * scale}px`,
        },
      });

      const img = new Image();
      img.src = dataUrl;

      img.onload = () => {
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth(); // 210mm
        const pdfHeight = pdf.internal.pageSize.getHeight(); // 297mm

        const pxToMm = (px) => (px * 25.4) / 96;
        const imgWidthMm = pxToMm(img.width);
        const imgHeightMm = pxToMm(img.height);

        const ratio = imgWidthMm / imgHeightMm;

        const renderedImgWidth = pdfWidth;
        const renderedImgHeight = renderedImgWidth / ratio;

        const totalPages = Math.ceil(renderedImgHeight / pdfHeight);

        for (let i = 0; i < totalPages; i++) {
          if (i > 0) pdf.addPage();
          pdf.addImage(
            dataUrl,
            "PNG",
            0,
            -i * pdfHeight,
            renderedImgWidth,
            renderedImgHeight
          );
        }

        pdf.save("cv.pdf");
      };
    } catch (error) {
      console.error("PDF generation failed:", error);
    }
  };


  return (
    <>
      <div className="bg-gray-100 min-h-screen min-w-screen  p-6">
        <div ref={printRef} className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10" >
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
            <h2 className="text-xl font-semibold text-blue-400">About Me</h2>
            <p className="text-gray-700 mt-2">{description}</p>
          </section>

          <section className="mt-6">
            <h2 className="text-xl font-semibold text-blue-400">Skills</h2>
            {skills &&
              Object.entries(skills).map(([category, skillList]) => (
                <div key={category} className="mt-2">
                  <h3 className="font-semibold text-gray-700">{category}</h3>
                  <p className="text-gray-600">{skillList.join(", ")}</p>
                </div>
              ))}
          </section>

          <section className="mt-6">
            <h2 className="text-xl font-semibold text-blue-400">Projects</h2>
            {projects.map((proj, idx) => (
              <div key={idx} className="mt-2">
                <h3 className="font-bold">{proj.projectName}</h3>
                <p>{proj.projectDescription}</p>
                <p className="text-sm text-gray-500">{proj.projectToolsAndTechnologies}</p>
              </div>
            ))}
          </section>

          <section className="mt-6">
            <h2 className="text-xl font-semibold text-blue-400">Experience</h2>
            {experience.map((exp, idx) => (
              <div key={idx} className="mt-2">
                <h3 className="font-bold">{exp.position} @ {exp.organizationName}</h3>
                <p className="text-sm text-gray-500">{exp.joiningDate} - {exp.endingDate}</p>
                <p>{exp.jobDescription}</p>
              </div>
            ))}
          </section>

          <section className="mt-6">
            <h2 className="text-xl font-semibold text-blue-400">Education</h2>
            {education.map((edu, idx) => (
              <div key={idx} className="mt-2">
                <h3 className="font-bold">{edu.educationQualification}</h3>
                <p>{edu.educationInstitutionName}</p>
                <p className="text-sm text-gray-500">{edu.startingDate} - {edu.endingDate}</p>
              </div>
            ))}
          </section>

          <section className="mt-6">
            <h2 className="text-xl font-semibold text-blue-400">Achievements</h2>
            <ul className="list-disc ml-6">
              {acheivement.map((ach, idx) => (
                <li key={idx}>{ach}</li>
              ))}
            </ul>
          </section>

          <section className="mt-6">
            <h2 className="text-xl font-semibold text-blue-400">Activities</h2>
            <ul className="list-disc ml-6">
              {activities.map((act, idx) => (
                <li key={idx}>{act}</li>
              ))}
            </ul>
          </section>

          <section className="mt-6">
            <h2 className="text-xl font-semibold text-blue-400">References</h2>
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
      </div>

      {/* back and download pdf button */}
      <div onClick={handleDownloadPdf} className="fixed bottom-4 right-4 h-10 w-10 rounded-full hover:bg-black bg-amber-600 text-white flex justify-center items-center">
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

export default UserCVDisplayLayout1;
