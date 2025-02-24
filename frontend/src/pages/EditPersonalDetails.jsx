import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa"; // Import the back icon

export default function EditPersonalDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(location.state?.personalDetails || {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/personal-details", {
        method: "PUT",
        credentials: "include", // Include cookies for authentication
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.message);
        navigate("/dashboard/profile"); // Navigate back after updating
      } else {
        const error = await response.json();
        console.error("Failed to update personal details:", error.error);
        alert(`Failed to update personal details: ${error.error}`);
      }
    } catch (error) {
      console.error("Error updating personal details:", error);
      alert("An error occurred while updating personal details. Please try again.");
    }
  };

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full">
      {/* Back Button */}
      <div className="flex items-center mb-4 cursor-pointer" onClick={handleBackClick}>
        <FaArrowLeft className="text-gray-600 mr-2" />
        <span className="text-sm text-gray-600 hover:text-gray-800">Back</span>
      </div>

      <h2 className="text-lg font-semibold text-gray-800 mb-4">Edit Personal Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Names */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Names</label>
          <input
            type="text"
            name="full_names"
            value={formData.full_names || ""}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title || ""}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
          <input
            type="date"
            name="date_of_birth"
            value={formData.date_of_birth || ""}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* ID Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700">ID Number</label>
          <input
            type="number"
            name="id_number"
            value={formData.id_number || ""}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Gender</label>
          <input
            type="text"
            name="gender"
            value={formData.gender || ""}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Nationality */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Nationality</label>
          <input
            type="text"
            name="nationality"
            value={formData.nationality || ""}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Home County */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Home County</label>
          <input
            type="text"
            name="home_county"
            value={formData.home_county || ""}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Constituency */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Constituency</label>
          <input
            type="text"
            name="constituency"
            value={formData.constituency || ""}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Postal Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Postal Address</label>
          <input
            type="text"
            name="postal_address"
            value={formData.postal_address || ""}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Mobile Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
          <input
            type="number"
            name="mobile_number"
            value={formData.mobile_number || ""}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Email Address</label>
          <input
            type="email"
            name="email_address"
            value={formData.email_address || ""}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Alternative Contact Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Alternative Contact Name</label>
          <input
            type="text"
            name="alternative_contact_name"
            value={formData.alternative_contact_name || ""}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Alternative Contact Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Alternative Contact Phone</label>
          <input
            type="number"
            name="alternative_contact_phone"
            value={formData.alternative_contact_phone || ""}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Disability */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Disability</label>
          <input
            type="text"
            name="disability"
            value={formData.disability || ""}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Disability Details */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Disability Details</label>
          <textarea
            name="disability_details"
            value={formData.disability_details || ""}
            onChange={handleChange}
            rows={3} // Adjust the number of rows as needed
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Disability Registration */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Disability Registration</label>
          <input
            type="text"
            name="disability_registration"
            value={formData.disability_registration || ""}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Criminal Conviction */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Criminal Conviction</label>
          <input
            type="text"
            name="criminal_conviction"
            value={formData.criminal_conviction || ""}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Criminal Offence Details */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Criminal Offence Details</label>
          <textarea
            name="criminal_offence_details"
            value={formData.criminal_offence_details || ""}
            onChange={handleChange}
            rows={3} // Adjust the number of rows as needed
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Dismissal from Employment */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Dismissal from Employment</label>
          <input
            type="text"
            name="dismissal_from_employment"
            value={formData.dismissal_from_employment || ""}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Dismissal Reason */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Dismissal Reason</label>
          <textarea
            name="dismissal_reason"
            value={formData.dismissal_reason || ""}
            onChange={handleChange}
            rows={3} // Adjust the number of rows as needed
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Dismissal Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Dismissal Date</label>
          <input
            type="date"
            name="dismissal_date"
            value={formData.dismissal_date || ""}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Update Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}