import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

export default function FetchedProfessionalQualifications() {
  const [qualifications, setQualifications] = useState([]);

  useEffect(() => {
    fetchQualifications();
  }, []);

  const fetchQualifications = async () => {
    try {
      const response = await fetch("http://localhost:5000/professional-qualifications", {
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
          {qualifications.length > 0 ? `Update Qualifications` : `Add Qualifications`}
        </Link>
      </div>
      {qualifications.length > 0 ? (
        qualifications.map((qualification) => (
          <div key={qualification.id} className="mt-4 space-y-2">
            <h3 className="text-md font-semibold">{qualification.award}</h3>
            <p className="text-sm text-gray-600">
              <strong>Institution:</strong> {qualification.institution}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Specialization:</strong> {qualification.specialization}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Grade:</strong> {qualification.grade}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Year From:</strong> {qualification.year_from}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Year To:</strong> {qualification.year_to}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Created At:</strong> {qualification.created_at}
            </p>
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-600">No professional qualifications added yet.</p>
      )}
    </div>
  );
}