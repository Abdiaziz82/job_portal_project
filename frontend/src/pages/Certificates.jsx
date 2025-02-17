import { FaArrowLeft } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Certificate() {
  const navigate = useNavigate();

  // State management for form fields
  const [certificateType, setCertificateType] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [institutionName, setInstitutionName] = useState("");
  const [yearOfCompletion, setYearOfCompletion] = useState("");
  const [grade, setGrade] = useState("");
  const [additionalAwards, setAdditionalAwards] = useState("");
  const [files, setFiles] = useState(null);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Validate required fields
    if (!certificateType || !specialization || !institutionName || !yearOfCompletion) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      // Create FormData object
      const formData = new FormData();
      formData.append("certificate_type", certificateType);
      formData.append("specialization", specialization);
      formData.append("institution_name", institutionName);
      formData.append("year_of_completion", yearOfCompletion);
      formData.append("grade", grade);
      formData.append("additional_awards", additionalAwards);

      // Append each selected file to the form data
      if (files) {
        Array.from(files).forEach((file) => formData.append("files[]", file));
      }
      

      // Send request to the backend
      const response = await fetch("http://127.0.0.1:5000/upload-certificate", {
        method: "POST",
        credentials: "include", // Include cookies in the request
        body: formData,
      });

      // Handle response
      if (response.ok) {
        const data = await response.json();
        alert("Certificate uploaded successfully!");
        console.log(data);
        navigate(-1); // Navigate back
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (err) {
      console.error("Error uploading certificate:", err);
      alert("An error occurred while uploading the certificate. Please try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen p-6 bg-gray-50">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-green-700 hover:text-blue-800 transition mb-6"
      >
        <FaArrowLeft className="mr-2" />
        Back
      </button>

      {/* Form Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Certificates & Awards</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-6">
        {/* Certificate Type & Specialization */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Certificate Type
            </label>
            <select
              value={certificateType}
              onChange={(e) => setCertificateType(e.target.value)}
              className="w-full p-3 border rounded-md shadow-sm focus:ring-green-600 focus:border-green-500"
            >
              <option value="">Select certificate type</option>
              <option value="kcse">KCSE</option>
              <option value="diploma">Diploma</option>
              <option value="degree">Degree</option>
              <option value="masters">Master's (MSc/MA)</option>
              <option value="phd">PhD</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Program Specialization
            </label>
            <input
              type="text"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              placeholder="Enter your specialization (e.g., Computer Science)"
              className="w-full p-3 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>

        {/* Institution Name & Year of Completion */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Institution Name
            </label>
            <input
              type="text"
              value={institutionName}
              onChange={(e) => setInstitutionName(e.target.value)}
              placeholder="Enter institution name"
              className="w-full p-3 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Year of Completion
            </label>
            <input
              type="number"
              value={yearOfCompletion}
              onChange={(e) => setYearOfCompletion(e.target.value)}
              placeholder="Enter the year"
              className="w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Grade & Additional Awards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Grade/Score
            </label>
            <input
              type="text"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              placeholder="Enter grade/score (e.g., A, First Class)"
              className="w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Additional Awards
            </label>
            <input
              type="text"
              value={additionalAwards}
              onChange={(e) => setAdditionalAwards(e.target.value)}
              placeholder="Enter any additional awards"
              className="w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Upload Certificate(s)
          </label>
          <input
            type="file"
            multiple
            onChange={(e) => setFiles(e.target.files)}
            className="block w-full text-gray-700 border p-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          <small className="text-gray-500">
            You can upload multiple files (PDF, JPEG, PNG).
          </small>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-green-700 text-white font-medium rounded-md hover:bg-green-800 transition"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
