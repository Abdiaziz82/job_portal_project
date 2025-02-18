import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export default function EditCertificate() {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(location.state?.certificate || {});
  const [selectedFiles, setSelectedFiles] = useState([]); // Store selected files

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setSelectedFiles([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("certificate_type", formData.certificate_type || "");
    formDataToSend.append("specialization", formData.specialization || "");
    formDataToSend.append("institution_name", formData.institution_name || "");
    formDataToSend.append("year_of_completion", formData.year_of_completion || "");
    formDataToSend.append("grade", formData.grade || "");
    formDataToSend.append("additional_awards", formData.additional_awards || "");

    // Append multiple files
    selectedFiles.forEach((file) => {
      formDataToSend.append("files[]", file);
    });

    try {
      const response = await fetch(`http://127.0.0.1:5000/certificates/${formData.id}`, {
        method: "PUT",
        credentials: "include",
        body: formDataToSend, // Send FormData
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.message);
        navigate("/dashboard/profile"); // Navigate back after updating
      } else {
        const error = await response.json();
        console.error("Failed to update certificate:", error.error);
        alert(`Failed to update certificate: ${error.error}`);
      }
    } catch (error) {
      console.error("Error updating certificate:", error);
      alert("An error occurred while updating the certificate. Please try again.");
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full">
      <div className="flex items-center mb-4 cursor-pointer" onClick={handleBackClick}>
        <FaArrowLeft className="text-gray-600 mr-2" />
        <span className="text-sm text-gray-600 hover:text-gray-800">Back</span>
      </div>

      <h2 className="text-lg font-semibold text-gray-800 mb-4">Edit Certificate</h2>
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <div>
          <label className="block text-sm font-medium text-gray-700">Certificate Type</label>
          <input
            type="text"
            name="certificate_type"
            value={formData.certificate_type || ""}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

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

        <div>
          <label className="block text-sm font-medium text-gray-700">Institution Name</label>
          <input
            type="text"
            name="institution_name"
            value={formData.institution_name || ""}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Year of Completion</label>
          <input
            type="number"
            name="year_of_completion"
            value={formData.year_of_completion || ""}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

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

        <div>
          <label className="block text-sm font-medium text-gray-700">Additional Awards</label>
          <input
            type="text"
            name="additional_awards"
            value={formData.additional_awards || ""}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Upload Files</label>
          <input
            type="file"
            name="files[]"
            multiple
            onChange={handleFileChange}
            className="mt-1 block w-full"
          />
        </div>

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
