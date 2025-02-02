import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

export default function ProfileSection({ label, path, fetchData }) {
  const [data, setData] = useState(null);

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetchData();
        if (response.ok) {
          const result = await response.json();
          setData(result);
        }
      } catch (error) {
        console.error(`Error fetching ${label}:`, error);
      }
    };

    fetchDetails();
  }, [fetchData, label]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2 sm:mb-0">
          {label}
        </h2>
        <Link
          to={path}
          className="flex items-center bg-green-700 text-white px-3 py-1 rounded-md hover:bg-green-800 transition text-sm sm:text-base whitespace-nowrap"
        >
          <FaPlus className="mr-2" />
          {data ? `Update ${label}` : `Add ${label}`}
        </Link>
      </div>
      {data ? (
        Array.isArray(data) ? (
          data.map((item) => (
            <div key={item.id} className="mt-4 space-y-2">
              {/* Display data based on the section */}
              {label === "Personal Details" && (
                <>
                  <h3 className="text-md font-semibold">{item.full_names}</h3>
                  <p className="text-sm text-gray-600">{item.email_address}</p>
                  <p className="text-sm text-gray-600">{item.mobile_number}</p>
                  {/* Add more fields as needed */}
                </>
              )}
              {label === "Next of Kin" && (
                <>
                  <h3 className="text-md font-semibold">{item.kin_name}</h3>
                  <p className="text-sm text-gray-600">{item.kin_address}</p>
                  <p className="text-sm text-gray-600">{item.kin_tel}</p>
                  <p className="text-sm text-gray-600">{item.kin_relationship}</p>
                  {/* Add more fields as needed */}
                </>
              )}
              {label === "Work Experience" && (
                <>
                  <h3 className="text-md font-semibold">{item.job_title}</h3>
                  <p className="text-sm text-gray-600">{item.company_name}</p>
                  <p className="text-sm text-gray-600">{item.responsibilities}</p>
                  {/* Add more fields as needed */}
                </>
              )}
            </div>
          ))
        ) : (
          <div className="mt-4 space-y-2">
            {/* Display single data object for Personal Details */}
            {label === "Personal Details" && (
              <>
                <h3 className="text-md font-semibold">{data.full_names}</h3>
                <p className="text-sm text-gray-600">{data.email_address}</p>
                <p className="text-sm text-gray-600">{data.mobile_number}</p>
                {/* Add more fields as needed */}
              </>
            )}
          </div>
        )
      ) : (
        <p className="text-sm text-gray-600">
          No {label.toLowerCase()} added yet.
        </p>
      )}
    </div>
  );
}