import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

export default function FetchedNextOfKin() {
  const [nextOfKin, setNextOfKin] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNextOfKin();
  }, []);

  const fetchNextOfKin = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/next-of-kin", {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setNextOfKin(data);
      }
    } catch (error) {
      console.error("Error fetching next of kin:", error);
    }
  };

  const handleEditClick = (kin) => {
    navigate("edit-next-of-kin", { state: { nextOfKin: kin } });
  };

  const handleDelete = async (kinId) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/next-of-kin/${kinId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        setNextOfKin((prevKin) => prevKin.filter((kin) => kin.id !== kinId));
        alert("Next of Kin deleted successfully.");
      } else {
        const error = await response.json();
        console.error("Failed to delete Next of Kin:", error.error);
        alert(`Failed to delete Next of Kin: ${error.error}`);
      }
    } catch (error) {
      console.error("Error deleting Next of Kin:", error);
      alert("An error occurred while deleting Next of Kin. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2 sm:mb-0">Next of Kin</h2>
        <Link
          to="next-of-kin"
          className="flex items-center bg-green-700 text-white px-3 py-1 rounded-md hover:bg-green-800 transition text-sm sm:text-base whitespace-nowrap"
        >
          <FaPlus className="mr-2" />
          Add Next of Kin
        </Link>
      </div>

      <div className="border-t-2 border-gray-300 my-6"></div>

      {nextOfKin.length > 0 ? (
  <div className="flex flex-wrap">
    {nextOfKin.map((kin, index) => (
      <div
        key={kin.id}
        className={`w-full sm:w-1/2 px-4 ${index % 2 === 0 ? "self-start" : "self-end"}`}
      >
        <div className="p-4 ">
          <div className="space-y-3">
            <div className="flex items-start">
              <strong className="text-sm text-gray-700 w-24">Name:</strong>
              <span className="text-sm text-gray-600 flex-1">{kin.kin_name}</span>
            </div>

            <div className="flex items-start">
              <strong className="text-sm text-gray-700 w-24">Address:</strong>
              <span className="text-sm text-gray-600 flex-1">{kin.kin_address}</span>
            </div>

            <div className="flex items-start">
              <strong className="text-sm text-gray-700 w-24">Telephone:</strong>
              <span className="text-sm text-gray-600 flex-1">{kin.kin_tel}</span>
            </div>

            <div className="flex items-start">
              <strong className="text-sm text-gray-700 w-24">Relationship:</strong>
              <span className="text-sm text-gray-600 flex-1">{kin.kin_relationship}</span>
            </div>

            <div className="flex space-x-4 mt-4">
              <div
                className="flex items-center bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-all shadow-sm"
                onClick={() => handleEditClick(kin)}
              >
                <FaEdit className="mr-2" />
                <span>Edit</span>
              </div>
              <div
                className="flex items-center bg-red-600 text-white px-5 py-2.5 rounded-lg hover:bg-red-700 transition-all shadow-sm"
                onClick={() => handleDelete(kin.id)}
              >
                <FaTrash className="mr-2" />
                <span>Remove</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
) : (
  <p className="text-sm text-gray-600">No next of kin added yet.</p>
)}


      <div className="border-t-2 border-gray-300 my-6"></div>
    </div>
  );
}
