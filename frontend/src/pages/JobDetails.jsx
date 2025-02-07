import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaRegCheckCircle } from "react-icons/fa"; // Importing the apply icon from React Icons

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/jobs/${id}`)
      .then((response) => response.json())
      .then((data) => setJob(data))
      .catch((error) => console.error("Error fetching job details:", error));
  }, [id]);

  if (!job) {
    return <p className="text-center text-gray-500 mt-12">Loading job details...</p>;
  }

  const { description, applicationDeadline, position } = job;

  const renderDynamicDescription = (text) => {
    const sections = text.split("\n").map((line, idx) => line.trim()).filter(line => line);

    let formattedContent = [];
    let inList = false;

    sections.forEach((line, index) => {
      if (line.toLowerCase().startsWith("requirements:") || line.toLowerCase().startsWith("roles and responsibilities:")) {
        const title = line.split(":")[0];
        const content = sections.slice(index + 1);

        formattedContent.push(
          <div key={index} className="mb-6">
            <p className="font-bold text-xl text-gray-700 mb-2">{title}:</p>
            <ul className="list-disc pl-5 text-gray-600">
              {content.map((item, idx) => {
                if (item !== '') {
                  return <li key={idx} className="mb-2">{item}</li>;
                }
                return null;
              })}
            </ul>
          </div>
        );
        inList = true;
      } else if (!inList) {
        formattedContent.push(
          <p key={index} className="text-lg text-gray-600 mb-4">{line}</p>
        );
      } else if (inList && line === '') {
        inList = false;
      }
    });

    return formattedContent;
  };

  return (
    <div className="container mx-auto mt-12 px-4 md:px-8">
      <h2 className="text-3xl font-bold text-green-700 text-center mb-6">{position}</h2>

      {/* Description Card */}
      <div className="bg-white p-8 rounded-lg shadow-lg mb-8 w-full relative pt-14">
        {/* Apply Now Button in the Top Right Corner */}
        <button
          className="bg-green-700 text-white py-2 px-4 rounded-lg hover:bg-green-800 transition absolute top-4 right-4 flex items-center space-x-2"
          onClick={() => alert("Apply functionality to be implemented")}
        >
          <FaRegCheckCircle className="text-white" /> {/* Icon */}
          <span>Apply Now for this job</span> {/* Text */}
        </button>

        {/* Dynamic Description */}
        <div className="text-lg text-gray-600 mb-4">
          {renderDynamicDescription(description)}
        </div>
      </div>

      {/* Deadline Section */}
      <div className="text-sm text-gray-500 mb-6">
        <p><strong>Deadline:</strong> {new Date(applicationDeadline).toLocaleDateString()}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-6 mb-12">
  {/* Apply Button */}
  <button
    className="bg-green-700 text-white py-2 px-5 rounded-lg hover:bg-green-800 transition w-full md:w-auto shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
    onClick={() => alert("Apply functionality to be implemented")}
  >
    <i className="fa fa-paper-plane mr-2"></i> Apply for this Job
  </button>

  {/* Go Back Button */}
  <button
    className="bg-gray-500 text-white py-2 px-5 rounded-lg hover:bg-gray-600 transition w-full md:w-auto shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
    onClick={() => navigate(-1)}
  >
    Go Back
  </button>
</div>

    </div>
  );
};

export default JobDetails;
