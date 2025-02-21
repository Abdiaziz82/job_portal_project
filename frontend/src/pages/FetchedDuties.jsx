import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

export default function FetchedDuties() {
  const [duties, setDuties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDuties();
  }, []);

  const fetchDuties = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/duties", {
        credentials: "include", // Include cookies for authentication
      });

      if (response.ok) {
        const data = await response.json();
        setDuties(data); // Set the fetched duties
      } else {
        console.error("Failed to fetch duties:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching duties:", error);
    }
  };

  const handleEditClick = (duty) => {
    navigate("edit-duty", { state: { duty } });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this duty?")) return;

    try {
      const response = await fetch(`http://127.0.0.1:5000/duties/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        // Remove the deleted duty from the state
        setDuties(duties.filter((duty) => duty.id !== id));
      } else {
        console.error("Failed to delete duty:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting duty:", error);
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-white rounded-lg shadow-md w-full overflow-hidden">
      {/* Thin Line at the Top (only shown if duties exist) */}
      {duties.length > 0 && <div className="border-t-2 border-gray-300 mb-4"></div>}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2 sm:mb-0">
          Duties
        </h2>
        <Link
          to="duties-form"
          className="flex items-center bg-green-700 text-white px-3 py-1 rounded-md hover:bg-green-800 transition text-sm sm:text-base whitespace-nowrap"
        >
          <FaPlus className="mr-2" />
          Add Duties
        </Link>
      </div>

      {duties.length > 0 ? (
        duties.map((duty) => (
          <div key={duty.id} className="mt-4 border-b pb-4">
            <h3 className="text-md font-semibold mb-2">Duty Details</h3>

            {/* Display Duty Data */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
              <p className="break-words whitespace-normal">
                <strong>Duties:</strong> {duty.duties}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mt-4">
              <button
                className="flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all shadow-sm cursor-pointer"
                onClick={() => handleEditClick(duty)}
              >
                <FaEdit className="mr-1" /> Edit
              </button>
              <button
                className="flex items-center justify-center bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all shadow-sm cursor-pointer"
                onClick={() => handleDelete(duty.id)}
              >
                <FaTrash className="mr-1" /> Remove
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-red-600">
          No duties added yet. Click on Add Duties to add your duties.
        </p>
      )}
    </div>
  );
}