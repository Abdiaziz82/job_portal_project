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
      const response = await fetch("http://127.0.0.1:5000/personal-details", {
        credentials: "include", // Include cookies for authentication
      });
      if (response.ok) {
        const data = await response.json();
        setPersonalDetails(data);
      } else {
        const error = await response.json();
        console.error("Failed to fetch personal details:", error.error);
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
          <p className="text-sm text-gray-600">
            <strong>Title:</strong> {personalDetails.title}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Date of Birth:</strong> {personalDetails.date_of_birth}
          </p>
          <p className="text-sm text-gray-600">
            <strong>ID Number:</strong> {personalDetails.id_number}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Gender:</strong> {personalDetails.gender}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Nationality:</strong> {personalDetails.nationality}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Home County:</strong> {personalDetails.home_county}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Constituency:</strong> {personalDetails.constituency}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Postal Address:</strong> {personalDetails.postal_address}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Mobile Number:</strong> {personalDetails.mobile_number}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Email Address:</strong> {personalDetails.email_address}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Alternative Contact Name:</strong> {personalDetails.alternative_contact_name}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Alternative Contact Phone:</strong> {personalDetails.alternative_contact_phone}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Disability:</strong> {personalDetails.disability}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Disability Details:</strong> {personalDetails.disability_details}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Disability Registration:</strong> {personalDetails.disability_registration}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Criminal Conviction:</strong> {personalDetails.criminal_conviction}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Criminal Offence Details:</strong> {personalDetails.criminal_offence_details}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Dismissal from Employment:</strong> {personalDetails.dismissal_from_employment}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Dismissal Reason:</strong> {personalDetails.dismissal_reason}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Dismissal Date:</strong> {personalDetails.dismissal_date}
          </p>
        </div>
      ) : (
        <p className="text-sm text-gray-600">No personal details added yet.</p>
      )}
    </div>
  );
}