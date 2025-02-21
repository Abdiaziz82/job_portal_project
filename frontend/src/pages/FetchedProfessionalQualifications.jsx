import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa"; // Importing the required icons

export default function FetchedProfessionalQualifications() {
  const [qualifications, setQualifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQualifications();
  }, []);

  const fetchQualifications = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/professional-qualifications", {
        credentials: "include", // Include cookies for authentication
      });
      if (response.ok) {
        const data = await response.json();
        setQualifications(data);
      } else {
        console.error("Failed to fetch professional qualifications:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching professional qualifications:", error);
    }
  };

  const handleEditClick = (qualification) => {
    navigate("edit-professional-qualification", { state: { qualification } });
  };

  const handleDeleteClick = async (id) => {
    if (!window.confirm("Are you sure you want to delete this qualification?")) return;
  
    try {
      const response = await fetch(`http://127.0.0.1:5000/professional-qualifications/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
  
      if (response.ok) {
        setQualifications(qualifications.filter((qual) => qual.id !== id));
      } else {
        console.error("Failed to delete qualification:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting qualification:", error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2 sm:mb-0">
          Professional Qualifications
        </h2>
        <Link
          to="ProfessionalQualifications"
          className="flex items-center bg-green-700 text-white px-3 py-1 rounded-md hover:bg-green-800 transition text-sm sm:text-base whitespace-nowrap"
        >
          <FaPlus className="mr-2" />
          Add Qualifications
        </Link>
      </div>

      {qualifications.length > 0 && <div className="border-t-2 border-gray-300 my-6"></div>}

      {qualifications.length > 0 ? (
        qualifications.map((qualification, index) => (
          <div key={qualification.id}>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
              <div className="flex items-start">
                <strong className="text-sm text-gray-700 w-40">Award:</strong>
                <span className="text-sm text-gray-600 flex-1">{qualification.award}</span>
              </div>
              <div className="flex items-start">
                <strong className="text-sm text-gray-700 w-40">Institution:</strong>
                <span className="text-sm text-gray-600 flex-1">{qualification.institution}</span>
              </div>
              <div className="flex items-start">
                <strong className="text-sm text-gray-700 w-40">Specialization:</strong>
                <span className="text-sm text-gray-600 flex-1">{qualification.specialization}</span>
              </div>
              <div className="flex items-start">
                <strong className="text-sm text-gray-700 w-40">Grade:</strong>
                <span className="text-sm text-gray-600 flex-1">{qualification.grade}</span>
              </div>
              <div className="flex items-start">
                <strong className="text-sm text-gray-700 w-40">Year From:</strong>
                <span className="text-sm text-gray-600 flex-1">{qualification.year_from}</span>
              </div>
              <div className="flex items-start">
                <strong className="text-sm text-gray-700 w-40">Year To:</strong>
                <span className="text-sm text-gray-600 flex-1">{qualification.year_to}</span>
              </div>
              <div className="flex items-start sm:col-span-2">
                <strong className="text-sm text-gray-700 w-40">Created At:</strong>
                <span className="text-sm text-gray-600 flex-1">{qualification.created_at}</span>
              </div>
            </div>

            <div className="flex space-x-4 mt-4">
              <div
                className="flex items-center bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-all shadow-sm cursor-pointer"
                onClick={() => handleEditClick(qualification)}
              >
                <FaEdit className="mr-2" />
                <span>Edit</span>
              </div>
              <div
                className="flex items-center bg-red-600 text-white px-5 py-2.5 rounded-lg hover:bg-red-700 transition-all shadow-sm cursor-pointer"
                onClick={() => handleDeleteClick(qualification.id)}
              >
                <FaTrash className="mr-2" />
                <span>Remove</span>
              </div>
            </div>

            {index !== qualifications.length - 1 && (
              <div className="border-t-2 border-gray-300 my-6"></div>
            )}
          </div>
        ))
      ) : (
        <p className=" text-red-600">No professional qualifications added yet. Click on Add Professional Qualification to add your qualifications</p>
      )}
    </div>
  );
}
