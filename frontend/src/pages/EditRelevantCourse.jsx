import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa"; // Import the back icon

export default function EditRelevantCourse() {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(location.state?.course || {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `/relevant-courses/${formData.id}`,
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
        console.error("Failed to update relevant course:", error.error);
        alert(`Failed to update relevant course: ${error.error}`);
      }
    } catch (error) {
      console.error("Error updating relevant course:", error);
      alert("An error occurred while updating relevant course. Please try again.");
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

      <h2 className="text-lg font-semibold text-gray-800 mb-4">Edit Relevant Course</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Course Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Course Name</label>
          <input
            type="text"
            name="course_name"
            value={formData.course_name || ""}
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

        {/* Year */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Year</label>
          <input
            type="number"
            name="year"
            value={formData.year || ""}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Details */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Details</label>
          <textarea
            name="details"
            value={formData.details || ""}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Duration</label>
          <input
            type="text"
            name="duration"
            value={formData.duration || ""}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Professional Body Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Professional Body Name</label>
          <input
            type="text"
            name="body_name"
            value={formData.body_name || ""}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Membership No */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Membership No</label>
          <input
            type="text"
            name="membership_no"
            value={formData.membership_no || ""}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Membership Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Membership Type</label>
          <input
            type="text"
            name="membership_type"
            value={formData.membership_type || ""}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Renewal Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Renewal Date</label>
          <input
            type="date"
            name="renewal_date"
            value={formData.renewal_date || ""}
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