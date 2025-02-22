import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

export default function FetchedPersonalDetails() {
  const [personalDetails, setPersonalDetails] = useState(null);
  const navigate = useNavigate();

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

  const handleEditClick = () => {
    navigate("edit-personal-details", { state: { personalDetails } });
  };

  const handleDelete = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/personal-details", {
        method: "DELETE",
        credentials: "include", // Include cookies for authentication
      });

      if (response.ok) {
        setPersonalDetails(null); // Clear the personal details from the state
        alert("Personal details deleted successfully.");
      } else {
        const error = await response.json();
        console.error("Failed to delete personal details:", error.error);
        alert(`Failed to delete personal details: ${error.error}`);
      }
    } catch (error) {
      console.error("Error deleting personal details:", error);
      alert("An error occurred while deleting personal details. Please try again.");
    }
  };

  return (
    <div className="p-8 bg-white rounded-xl border border-gray-100 shadow-lg w-full mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">
          Personal Details
        </h2>
        <Link
          to="personal-details"
          className="flex items-center bg-green-700 text-white px-5 py-2.5 rounded-lg hover:bg-green-700 transition-all text-sm sm:text-base whitespace-nowrap shadow-sm"
        >
          <FaPlus className="mr-2" />
          Add Personal Details
        </Link>
      </div>
      {personalDetails ? (
        <div className="mt-6">
          {/* Personal Details Section */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 border-b-2 border-gray-300 pb-3">
                {personalDetails.full_names}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-3">
                  <DetailItem label="Title" value={personalDetails.title} />
                  <DetailItem label="Date of Birth" value={personalDetails.date_of_birth} />
                  <DetailItem label="ID Number" value={personalDetails.id_number} />
                  <DetailItem label="Gender" value={personalDetails.gender} />
                  <DetailItem label="Nationality" value={personalDetails.nationality} />
                  <DetailItem label="Home County" value={personalDetails.home_county} />
                  <DetailItem label="Constituency" value={personalDetails.constituency} />
                </div>
                {/* Right Column */}
                <div className="space-y-3">
                  <DetailItem label="Postal Address" value={personalDetails.postal_address} />
                  <DetailItem label="Mobile Number" value={personalDetails.mobile_number} />
                  <DetailItem label="Email Address" value={personalDetails.email_address} />
                  <DetailItem
                    label="Alternative Contact Name"
                    value={personalDetails.alternative_contact_name}
                  />
                  <DetailItem
                    label="Alternative Contact Phone"
                    value={personalDetails.alternative_contact_phone}
                  />
                  <DetailItem label="Disability" value={personalDetails.disability} />
                  <DetailItem
                    label="Disability Details"
                    value={personalDetails.disability_details}
                  />
                  <DetailItem
                    label="Disability Registration"
                    value={personalDetails.disability_registration}
                  />
                </div>
              </div>
            </div>

            {/* Thick Horizontal Divider */}
            <div className="border-t-2 border-gray-300 my-6"></div>

            {/* Additional Details Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 border-b-2 border-gray-300 pb-3">
                Additional Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-3">
                  <DetailItem
                    label="Criminal Conviction"
                    value={personalDetails.criminal_conviction}
                  />
                  <DetailItem
                    label="Criminal Offence Details"
                    value={personalDetails.criminal_offence_details}
                  />
                </div>
                {/* Right Column */}
                <div className="space-y-3">
                  <DetailItem
                    label="Dismissal from Employment"
                    value={personalDetails.dismissal_from_employment}
                  />
                  <DetailItem
                    label="Dismissal Reason"
                    value={personalDetails.dismissal_reason}
                  />
                  <DetailItem
                    label="Dismissal Date"
                    value={personalDetails.dismissal_date}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-row space-x-4 mt-8">
            <button
              className="flex items-center justify-center bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-all shadow-sm"
              onClick={handleEditClick}
            >
              <FaEdit className="mr-2" />
              <span>Edit</span>
            </button>
            <button
              className="flex items-center justify-center bg-red-600 text-white px-5 py-2.5 rounded-lg hover:bg-red-700 transition-all shadow-sm"
              onClick={handleDelete}
            >
              <FaTrash className="mr-2" />
              <span>Remove</span>
            </button>
          </div>
        </div>
      ) : (
        <p className="text-red-600">
          No personal details added yet. Click on Add Personal Details to add your personal details.
        </p>
      )}
    </div>
  );
}

// Reusable DetailItem Component
function DetailItem({ label, value }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start">
      <strong className="text-sm text-gray-700 sm:w-48">{label}:</strong>
      <span className="text-sm text-gray-600 sm:flex-1 break-words">
        {value || "N/A"}
      </span>
    </div>
  );
}