import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa"; // Import the back icon

export default function EditProfessionalQualification() {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(location.state?.qualification || {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://127.0.0.1:5000/professional-qualifications/${formData.id}`,
        {
          method: "PUT",
          credentials: "include", // Include cookies for authentication
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log(result.message);
        navigate("/dashboard/profile"); // Navigate back after updating
      } else {
        const error = await response.json();
        console.error("Failed to update professional qualification:", error.error);
        alert(`Failed to update professional qualification: ${error.error}`);
      }
    } catch (error) {
      console.error("Error updating professional qualification:", error);
      alert("An error occurred while updating professional qualification. Please try again.");
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

      <h2 className="text-lg font-semibold text-gray-800 mb-4">Edit Professional Qualification</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Award */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Award</label>
          <input
            type="text"
            name="award"
            value={formData.award || ""}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Institution */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Institution</label>
          <input
            type="text"
            name="institution"
            value={formData.institution || ""}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Specialization */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Specialization</label>
          <input
            type="text"
            name="specialization"
            value={formData.specialization || ""}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Grade */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Grade</label>
          <input
            type="text"
            name="grade"
            value={formData.grade || ""}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Year From */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Year From</label>
          <input
            type="number"
            name="year_from"
            value={formData.year_from || ""}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Year To */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Year To</label>
          <input
            type="number"
            name="year_to"
            value={formData.year_to || ""}
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