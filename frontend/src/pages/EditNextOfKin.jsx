import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa"; // Import the back icon

export default function EditNextOfKin() {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(location.state?.nextOfKin || {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://127.0.0.1:5000/next-of-kin/${formData.id}`, {
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
        console.error("Failed to update next of kin:", error.error);
        alert(`Failed to update next of kin: ${error.error}`);
      }
    } catch (error) {
      console.error("Error updating next of kin:", error);
      alert("An error occurred while updating next of kin. Please try again.");
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

      <h2 className="text-lg font-semibold text-gray-800 mb-4">Edit Next of Kin</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Kin Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Kin Name</label>
          <input
            type="text"
            name="kin_name"
            value={formData.kin_name || ""}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Kin Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Kin Address</label>
          <input
            type="text"
            name="kin_address"
            value={formData.kin_address || ""}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Kin Telephone */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Kin Telephone</label>
          <input
            type="number"
            name="kin_tel"
            value={formData.kin_tel || ""}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Kin Relationship */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Kin Relationship</label>
          <input
            type="text"
            name="kin_relationship"
            value={formData.kin_relationship || ""}
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