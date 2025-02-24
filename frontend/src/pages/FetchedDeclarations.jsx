import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

export default function FetchedDeclarations() {
  const [declarations, setDeclarations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDeclarations();
  }, []);

  const fetchDeclarations = async () => {
    try {
      const response = await fetch("/declarations", {
        credentials: "include", // Include cookies for authentication
      });

      if (response.ok) {
        const data = await response.json();
        setDeclarations(data); // Set the fetched declarations
      } else {
        console.error("Failed to fetch declarations:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching declarations:", error);
    }
  };

  const handleEditClick = (declaration) => {
    navigate("edit-declaration", { state: { declaration } });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this declaration?"))
      return;

    try {
      const response = await fetch(`/declarations/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        // Remove the deleted declaration from the state
        setDeclarations(declarations.filter((declaration) => declaration.id !== id));
      } else {
        console.error("Failed to delete declaration:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting declaration:", error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full">
      {/* Thin Line at the Top (only shown if declarations exist) */}
      {declarations.length > 0 && <div className="border-t-2 border-gray-300 mb-4"></div>}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2 sm:mb-0">
          Declarations
        </h2>
        <Link
          to="declaration-form"
          className="flex items-center bg-green-700 text-white px-3 py-1 rounded-md hover:bg-green-800 transition text-sm sm:text-base whitespace-nowrap"
        >
          <FaPlus className="mr-2" />
          Add Declaration
        </Link>
      </div>

      {declarations.length > 0 ? (
        declarations.map((declaration) => (
          <div key={declaration.id} className="mt-4 border-b pb-4">
            <h3 className="text-md font-semibold mb-2">Declaration Details</h3>

            {/* Display Declaration Data */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
              <p>
                <strong>Date:</strong> {declaration.date}
              </p>
              <p>
                <strong>Name:</strong> {declaration.name}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 mt-4">
              <button
                className="flex items-center bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-all shadow-sm cursor-pointer"
                onClick={() => handleEditClick(declaration)}
              >
                <FaEdit className="mr-1" /> Edit
              </button>
              <button
                className="flex items-center bg-red-600 text-white px-5 py-2.5 rounded-lg hover:bg-red-700 transition-all shadow-sm cursor-pointer"
                onClick={() => handleDelete(declaration.id)}
              >
                <FaTrash className="mr-1" /> Remove
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-red-600">
          No declarations added yet. Click on Add Declaration to add your declarations.
        </p>
      )}
    </div>
  );
}