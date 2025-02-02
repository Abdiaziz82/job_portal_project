import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

export default function FetchedPersonalDetails() {
  const [personalDetails, setPersonalDetails] = useState(null);

  useEffect(() => {
    fetchPersonalDetails();
  }, []);

  const fetchPersonalDetails = async () => {
    try {
      const response = await fetch("http://localhost:5000/personal-details", {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setPersonalDetails(data);
      }
    } catch (error) {
      console.error("Error fetching personal details:", error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2 sm:mb-0">
          Personal Details
        </h2>
        <Link
          to="personal-details"
          className="flex items-center bg-green-700 text-white px-3 py-1 rounded-md hover:bg-green-800 transition text-sm sm:text-base whitespace-nowrap"
        >
          <FaPlus className="mr-2" />
          {personalDetails ? `Update Personal Details` : `Add Personal Details`}
        </Link>
      </div>
      {personalDetails ? (
        <div className="mt-4 space-y-2">
          <h3 className="text-md font-semibold">{personalDetails.full_names}</h3>
          <p className="text-sm text-gray-600">{personalDetails.email_address}</p>
          <p className="text-sm text-gray-600">{personalDetails.mobile_number}</p>
        </div>
      ) : (
        <p className="text-sm text-gray-600">No personal details added yet.</p>
      )}
    </div>
  );
}