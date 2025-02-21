import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash ,FaFilePdf } from "react-icons/fa"; // Importing the required icons

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

  const handleDeleteClick = async (id) => {
    if (!window.confirm("Are you sure you want to delete this educational background?")) return;

    try {
      const response = await fetch(`http://127.0.0.1:5000/education/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        setEducation(education.filter((edu) => edu.id !== id));
      } else {
        console.error("Failed to delete education:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting education:", error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2 sm:mb-0">
          Educational Background
        </h2>
        <Link
          to="education"
          className="flex items-center bg-green-700 text-white px-5 py-2.5 rounded-lg hover:bg-green-700 transition-all text-sm sm:text-base whitespace-nowrap shadow-sm"
        >
          <FaPlus className="mr-2" />
          Add Education
        </Link>
      </div>
      {education.length > 0 && <div className="border-t-2 border-gray-300 my-6"></div>}
      {education.length > 0 ? (
        education.map((edu, index) => {
          // **Use `file_paths` array from API instead of `file_path`**
          const filePaths = edu.file_paths || [];

          return (
            <div key={edu.id}>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* High School Details */}
                <div className="space-y-3">
                  <h3 className="text-md font-semibold">High School Details</h3>
                  <div className="flex items-start">
                    <strong className="text-sm text-gray-700 w-40">School Name:</strong>
                    <span className="text-sm text-gray-600 flex-1">{edu.school_name}</span>
                  </div>
                  <div className="flex items-start">
                    <strong className="text-sm text-gray-700 w-40">Year Completed:</strong>
                    <span className="text-sm text-gray-600 flex-1">{edu.year_completed}</span>
                  </div>
                  <div className="flex items-start">
                    <strong className="text-sm text-gray-700 w-40">Grade:</strong>
                    <span className="text-sm text-gray-600 flex-1">{edu.high_school_grade}</span>
                  </div>
                  <div className="flex items-start">
                    <strong className="text-sm text-gray-700 w-40">Activities:</strong>
                    <span className="text-sm text-gray-600 flex-1">{edu.high_school_activities}</span>
                  </div>
                </div>
                {/* University Details */}
                <div className="space-y-3">
                  <h3 className="text-md font-semibold">University</h3>
                  <div className="flex items-start">
                    <strong className="text-sm text-gray-700 w-40">University Name:</strong>
                    <span className="text-sm text-gray-600 flex-1">{edu.university_name}</span>
                  </div>
                  <div className="flex items-start">
                    <strong className="text-sm text-gray-700 w-40">Degree Program:</strong>
                    <span className="text-sm text-gray-600 flex-1">{edu.degree_program}</span>
                  </div>
                  <div className="flex items-start">
                    <strong className="text-sm text-gray-700 w-40">Field of Study:</strong>
                    <span className="text-sm text-gray-600 flex-1">{edu.field_of_study}</span>
                  </div>
                  <div className="flex items-start">
                    <strong className="text-sm text-gray-700 w-40">University Grade:</strong>
                    <span className="text-sm text-gray-600 flex-1">{edu.university_grade}</span>
                  </div>
                  <div className="flex items-start">
                    <strong className="text-sm text-gray-700 w-40">Start Date:</strong>
                    <span className="text-sm text-gray-600 flex-1">{edu.start_date}</span>
                  </div>
                  <div className="flex items-start">
                    <strong className="text-sm text-gray-700 w-40">End Date:</strong>
                    <span className="text-sm text-gray-600 flex-1">{edu.end_date}</span>
                  </div>
                </div>
              </div>
              {/* Display each file as a clickable link */}
              {filePaths.length > 0 && (
  <div className="flex flex-col sm:col-span-2 mt-4">
    <strong className="text-sm text-gray-700 w-40">Documents:</strong>
    <div className="flex flex-wrap gap-2 mt-1">
      {filePaths.map((file, idx) => (
        <a
          key={idx}
          href={file}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 bg-blue-600 text-white text-xs px-3 py-1 rounded-md shadow-sm transition-all hover:bg-blue-700 duration-200"
        >
          <FaFilePdf className="text-white text-sm" />
          <span>View {idx + 1}</span>
        </a>
      ))}
    </div>
  </div>
)}

              <div className="flex space-x-4 mt-4">
                <div
                  className="flex items-center bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-all shadow-sm cursor-pointer"
                  onClick={() => handleEditClick(edu)}
                >
                  <FaEdit className="mr-2" />
                  <span>Edit</span>
                </div>
                <div
                  className="flex items-center bg-red-600 text-white px-5 py-2.5 rounded-lg hover:bg-red-700 transition-all shadow-sm cursor-pointer"
                  onClick={() => handleDeleteClick(edu.id)}
                >
                  <FaTrash className="mr-2" />
                  <span>Remove</span>
                </div>
              </div>
              {index !== education.length - 1 && (
                <div className="border-t-2 border-gray-300 my-6"></div>
              )}
            </div>
          );
        })
      ) : (
        <p className=" text-red-600">No educational background added yet. click on Add Education to add your Educational Background </p>
      )}
    </div>
  );
}
