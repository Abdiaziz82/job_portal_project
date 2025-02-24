import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa"; // Importing the required icons

export default function FetchedEmploymentDetails() {
  const [employmentDetails, setEmploymentDetails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmploymentDetails();
  }, []);

  const fetchEmploymentDetails = async () => {
    try {
      const response = await fetch("/employment-details", {
        credentials: "include", // Include cookies for authentication
      });
      if (response.ok) {
        const data = await response.json();
        setEmploymentDetails(data);
      } else {
        console.error("Failed to fetch employment details:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching employment details:", error);
    }
  };

  const handleEditClick = (employment) => {
    navigate("edit-employment-details", { state: { employment } });
  };

  const handleDeleteClick = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employment detail?")) return;

    try {
      const response = await fetch(`/employment-details/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        setEmploymentDetails(employmentDetails.filter((employment) => employment.id !== id));
      } else {
        console.error("Failed to delete employment detail:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting employment detail:", error);
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-white rounded-lg shadow-md w-full overflow-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Employment Details</h2>
        <Link
          to="EmploymentDetailsForm"
          className="flex items-center bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800 transition text-sm sm:text-base whitespace-nowrap"
        >
          <FaPlus className="mr-2" />
          Add Employment Details
        </Link>
      </div>

      {employmentDetails.length > 0 ? (
        employmentDetails.map((employment) => (
          <div
            key={employment.id}
            className="p-4 border-t border-gray-300 bg-white"
          >
            <h3 className="text-lg font-semibold text-gray-900 break-words whitespace-normal">
              {employment.designation}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2 text-sm text-gray-700">
              <p className="break-words whitespace-normal"><strong>Year:</strong> {employment.year}</p>
              <p className="break-words whitespace-normal"><strong>Job Group:</strong> {employment.job_group}</p>
              <p className="break-words whitespace-normal"><strong>Gross Salary:</strong> {employment.gross_salary}</p>
              <p className="break-words whitespace-normal"><strong>Ministry:</strong> {employment.ministry}</p>
              <p className="break-words whitespace-normal"><strong>From Date:</strong> {employment.from_date}</p>
              <p className="break-words whitespace-normal"><strong>To Date:</strong> {employment.to_date}</p>
              <p className="break-words whitespace-normal"><strong>Duties:</strong> {employment.duties}</p>
            </div>

            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mt-4">
              <button
                className="flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all shadow-sm cursor-pointer"
                onClick={() => handleEditClick(employment)}
              >
                <FaEdit className="mr-1" /> Edit
              </button>
              <button
                className="flex items-center justify-center bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all shadow-sm cursor-pointer"
                onClick={() => handleDeleteClick(employment.id)}
              >
                <FaTrash className="mr-1" /> Remove
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-red-600">
          No employment details added yet. Click on Add Employment Details to add your employment details.
        </p>
      )}
    </div>
  );
}