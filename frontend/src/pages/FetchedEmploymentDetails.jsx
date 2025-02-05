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
      const response = await fetch("http://127.0.0.1:5000/employment-details", {
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
      const response = await fetch(`http://127.0.0.1:5000/employment-details/${id}`, {
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
    <div className="p-6 bg-white rounded-lg shadow-md w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2 sm:mb-0">
          Employment Details
        </h2>
        <Link
          to="EmploymentDetailsForm"
          className="flex items-center bg-green-700 text-white px-3 py-1 rounded-md hover:bg-green-800 transition text-sm sm:text-base whitespace-nowrap"
        >
          <FaPlus className="mr-2" />
          {employmentDetails.length > 0 ? `Update Employment Details` : `Add Employment Details`}
        </Link>
      </div>
      {employmentDetails.length > 0 ? (
        employmentDetails.map((employment) => (
          <div key={employment.id} className="mt-4 space-y-2 border-b pb-4">
            <h3 className="text-md font-semibold">{employment.designation}</h3>
            <p className="text-sm text-gray-600"><strong>Year:</strong> {employment.year}</p>
            <p className="text-sm text-gray-600"><strong>Job Group:</strong> {employment.job_group}</p>
            <p className="text-sm text-gray-600"><strong>Gross Salary:</strong> {employment.gross_salary}</p>
            <p className="text-sm text-gray-600"><strong>Ministry:</strong> {employment.ministry}</p>
            <p className="text-sm text-gray-600"><strong>From Date:</strong> {employment.from_date}</p>
            <p className="text-sm text-gray-600"><strong>To Date:</strong> {employment.to_date}</p>
            <p className="text-sm text-gray-600"><strong>Duties:</strong> {employment.duties}</p>
            <p className="text-sm text-gray-600"><strong>Publications:</strong> {employment.publications}</p>
            <p className="text-sm text-gray-600"><strong>Skills & Experience:</strong> {employment.skills_experience}</p>
            
            <div className="flex space-x-4 mt-2">
              <button
                className="flex items-center text-blue-600 hover:text-blue-800 text-sm"
                onClick={() => handleEditClick(employment)}
              >
                <FaEdit className="mr-1" /> Edit
              </button>
              <button
              className="flex items-center text-red-600 hover:text-red-800 text-sm"
              onClick={() => handleDeleteClick(employment.id)}
          >
  <FaTrash className="mr-1" /> Remove
</button>

            </div>
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-600">No employment details added yet.</p>
      )}
    </div>
  );
}