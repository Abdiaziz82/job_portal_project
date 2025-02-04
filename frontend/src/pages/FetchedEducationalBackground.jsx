import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa"; // Importing the required icons

export default function FetchedEducationalBackground() {
  const [education, setEducation] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/education", {
        credentials: "include", // Include cookies for authentication
      });
      if (response.ok) {
        const data = await response.json();
        setEducation(data);
      } else {
        console.error("Failed to fetch educational background:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching educational background:", error);
    }
  };

  const handleEditClick = (edu) => {
    navigate("edit-educational-background", { state: { education: edu } });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2 sm:mb-0">
          Educational Background
        </h2>
        <Link
          to="education"
          className="flex items-center bg-green-700 text-white px-3 py-1 rounded-md hover:bg-green-800 transition text-sm sm:text-base whitespace-nowrap"
        >
          <FaPlus className="mr-2" />
          Add Education
        </Link>
      </div>
      {education.length > 0 ? (
        education.map((edu) => (
          <div key={edu.id} className="mt-4 space-y-2">
            <h3 className="text-md font-semibold">{edu.school_name}</h3>
            <p className="text-sm text-gray-600">
              <strong>Year Completed:</strong> {edu.year_completed}
            </p>
            <p className="text-sm text-gray-600">
              <strong>High School Grade:</strong> {edu.high_school_grade}
            </p>
            <p className="text-sm text-gray-600">
              <strong>High School Activities:</strong> {edu.high_school_activities}
            </p>
            <p className="text-sm text-gray-600">
              <strong>University Name:</strong> {edu.university_name}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Degree Program:</strong> {edu.degree_program}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Field of Study:</strong> {edu.field_of_study}
            </p>
            <p className="text-sm text-gray-600">
              <strong>University Grade:</strong> {edu.university_grade}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Start Date:</strong> {edu.start_date}
            </p>
            <p className="text-sm text-gray-600">
              <strong>End Date:</strong> {edu.end_date}
            </p>
            {edu.file_path && (
  <a
    href={edu.file_path} // Use the full URL from backend
    target="_blank"
    rel="noopener noreferrer"
    className="text-sm text-blue-600 hover:underline"
  >
    View Educational Document
  </a>
)}

            <div className="flex space-x-4 mt-2">
              <button
                className="flex items-center text-blue-600 hover:text-blue-800 text-sm"
                onClick={() => handleEditClick(edu)}
              >
                <FaEdit className="mr-1" /> Edit
              </button>
              <button className="flex items-center text-red-600 hover:text-red-800 text-sm">
                <FaTrash className="mr-1" /> Remove
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-600">No educational background added yet.</p>
      )}
    </div>
  );
}