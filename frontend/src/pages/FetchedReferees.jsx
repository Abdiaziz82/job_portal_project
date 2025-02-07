import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

export default function FetchedReferees() {
  const [referees, setReferees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchReferees();
  }, []);

  const fetchReferees = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/referees", {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setReferees(data);
      } else {
        console.error("Failed to fetch referees:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching referees:", error);
    }
  };

  const handleEditClick = (referee) => {
    navigate("edit-referee", { state: { referee } });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this referee?")) return;

    try {
      const response = await fetch(`http://127.0.0.1:5000/referees/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        setReferees(referees.filter((referee) => referee.id !== id));
      } else {
        console.error("Failed to delete referee:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting referee:", error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full">
      {/* Thin Line at the Top */}
      <div className="border-t-2 border-gray-300 mb-4"></div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2 sm:mb-0">
          Referees
        </h2>
        <Link
          to="referees"
          className="flex items-center bg-green-700 text-white px-3 py-1 rounded-md hover:bg-green-800 transition text-sm sm:text-base whitespace-nowrap"
        >
          <FaPlus className="mr-2" />
          Add Referees
        </Link>
      </div>

      {referees.length > 0 ? (
        referees.map((referee) => (
          <div key={referee.id} className="mt-4 border-b pb-4">
            <h3 className="text-md font-semibold mb-2">{referee.full_name}</h3>

            {/* Grid for Two-Column Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
              <p><strong>Occupation:</strong> {referee.occupation}</p>
              <p><strong>Address:</strong> {referee.address}</p>
              <p><strong>Post Code:</strong> {referee.post_code}</p>
              <p><strong>City/Town:</strong> {referee.city_town}</p>
              <p><strong>Mobile No:</strong> {referee.mobile_no}</p>
              <p><strong>Email:</strong> {referee.email}</p>
              <p><strong>Known Period:</strong> {referee.known_period}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 mt-4">
              <button
                className="flex items-center bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-all shadow-sm cursor-pointer"
                onClick={() => handleEditClick(referee)}
              >
                <FaEdit className="mr-1" /> Edit
              </button>
              <button
                className="flex items-center bg-red-600 text-white px-5 py-2.5 rounded-lg hover:bg-red-700 transition-all shadow-sm cursor-pointer"
                onClick={() => handleDelete(referee.id)}
              >
                <FaTrash className="mr-1" /> Remove
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-600">No referees added yet.</p>
      )}
    </div>
  );
}
