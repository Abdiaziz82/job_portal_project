import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa"; // Importing the required icons

export default function FetchedReferees() {
  const [referees, setReferees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchReferees();
  }, []);

  const fetchReferees = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/referees", {
        credentials: "include", // Include cookies for authentication
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2 sm:mb-0">
          Referees
        </h2>
        <Link
          to="referees"
          className="flex items-center bg-green-700 text-white px-3 py-1 rounded-md hover:bg-green-800 transition text-sm sm:text-base whitespace-nowrap"
        >
          <FaPlus className="mr-2" />
          {referees.length > 0 ? `Update Referees` : `Add Referees`}
        </Link>
      </div>
      {referees.length > 0 ? (
        referees.map((referee) => (
          <div key={referee.id} className="mt-4 space-y-2 border-b pb-4">
            <h3 className="text-md font-semibold">{referee.full_name}</h3>
            <p className="text-sm text-gray-600">
              <strong>Occupation:</strong> {referee.occupation}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Address:</strong> {referee.address}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Post Code:</strong> {referee.post_code}
            </p>
            <p className="text-sm text-gray-600">
              <strong>City/Town:</strong> {referee.city_town}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Mobile No:</strong> {referee.mobile_no}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Email:</strong> {referee.email}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Known Period:</strong> {referee.known_period}
            </p>
            <div className="flex space-x-4 mt-2">
              <button
                className="flex items-center text-blue-600 hover:underline"
                onClick={() => handleEditClick(referee)}
              >
                <FaEdit className="mr-1" /> Edit
              </button>
              <button
            className="flex items-center text-red-600 hover:underline"
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