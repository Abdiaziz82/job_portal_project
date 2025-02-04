import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa"; // Importing the required icons

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

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2 sm:mb-0">
          Next of Kin
        </h2>
        <Link
          to="next-of-kin"
          className="flex items-center bg-green-700 text-white px-3 py-1 rounded-md hover:bg-green-800 transition text-sm sm:text-base whitespace-nowrap"
        >
          <FaPlus className="mr-2" />
          Add Next of Kin
        </Link>
      </div>
      {nextOfKin.length > 0 ? (
        nextOfKin.map((kin) => (
          <div key={kin.id} className="mt-4 space-y-2">
            <h3 className="text-md font-semibold">{kin.kin_name}</h3>
            <p className="text-sm text-gray-600">{kin.kin_address}</p>
            <p className="text-sm text-gray-600">{kin.kin_tel}</p>
            <p className="text-sm text-gray-600">{kin.kin_relationship}</p>
            {/* Adding Edit and Remove icons with text */}
            <div className="flex space-x-4 mt-4">
              <div
                className="flex items-center text-blue-600 cursor-pointer"
                onClick={() => handleEditClick(kin)}
              >
                <FaEdit className="mr-2" />
                <span>Edit</span>
              </div>
              <div className="flex items-center text-red-600 cursor-pointer">
                <FaTrash className="mr-2" />
                <span>Remove</span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-600">No next of kin added yet.</p>
      )}
    </div>
  );
}