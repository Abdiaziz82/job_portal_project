import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // For making HTTP requests

export default function Education() {
  const navigate = useNavigate();

  // State for form fields
  const [formData, setFormData] = useState({
    school_name: "",
    year_completed: "",
    high_school_grade: "",
    high_school_activities: "",
    university_name: "",
    degree_program: "",
    field_of_study: "",
    university_grade: "",
    start_date: "",
    end_date: "",
    files: [], // Now handles multiple files
  });
  

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle multiple file input changes
  const handleFileChange = (e) => {
    setFormData({ ...formData, files: Array.from(e.target.files) });
};
  

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("school_name", formData.school_name);
    data.append("year_completed", formData.year_completed);
    data.append("high_school_grade", formData.high_school_grade);
    data.append("high_school_activities", formData.high_school_activities);
    data.append("university_name", formData.university_name);
    data.append("degree_program", formData.degree_program);
    data.append("field_of_study", formData.field_of_study);
    data.append("university_grade", formData.university_grade);
    data.append("start_date", formData.start_date);
    data.append("end_date", formData.end_date);

    // Append multiple files
    formData.files.forEach((file) => {
        data.append("files", file);  // Ensure this matches the backend
    });

    try {
        const response = await axios.post(
            "/upload-educational-background",
            data,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            }
        );

        if (response.status === 201) {
            alert("Educational background saved successfully!");
            navigate(-1);
        }
    } catch (error) {
        console.error("Error saving educational background:", error);
        alert("Failed to save educational background. Please try again.");
    }
};

  
  return (
    <div className="flex flex-col min-h-screen p-6 bg-gray-50">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-green-700 hover:text-green-800 transition mb-6"
      >
        <FaArrowLeft className="mr-2" />
        Back
      </button>

      {/* Form Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Educational Background</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-10">
        {/* High School Section */}
        <div>
          <h2 className="text-2xl font-semibold text-green-700 mb-4">High School Education</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                School Name
              </label>
              <input
                type="text"
                name="school_name"
                placeholder="Enter high school name"
                value={formData.school_name}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Year Completed
              </label>
              <input
                type="number"
                name="year_completed"
                placeholder="Enter year of graduation"
                value={formData.year_completed}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Grade/Class
              </label>
              <input
                type="text"
                name="high_school_grade"
                placeholder="Enter grade or classification (e.g., A, B)"
                value={formData.high_school_grade}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Extracurricular Activities
              </label>
              <textarea
                name="high_school_activities"
                placeholder="Enter activities or clubs participated in"
                value={formData.high_school_activities}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                rows="3"
              ></textarea>
            </div>
          </div>
        </div>

        {/* University Section */}
        <div>
          <h2 className="text-2xl font-semibold text-green-700 mb-4">University Education</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                University Name
              </label>
              <input
                type="text"
                name="university_name"
                placeholder="Enter university name"
                value={formData.university_name}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Degree/Program
              </label>
              <input
                type="text"
                name="degree_program"
                placeholder="Enter degree or program (e.g., BSc, MSc, PhD)"
                value={formData.degree_program}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Field of Study
              </label>
              <input
                type="text"
                name="field_of_study"
                placeholder="Enter field of study (e.g., Computer Science)"
                value={formData.field_of_study}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Grade/Class
              </label>
              <input
                type="text"
                name="university_grade"
                placeholder="Enter grade or classification (e.g., First Class)"
                value={formData.university_grade}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Start Date
              </label>
              <input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                End Date
              </label>
              <input
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
        </div>

        {/* File Upload */}
<div>
  <label className="block text-gray-700 font-medium mb-2">
    Upload Certificates/Transcripts
  </label>
  <input
    type="file"
    name="files"  // Ensure this matches the backend
    multiple  // Allow multiple files
    onChange={handleFileChange}
    className="block w-full text-gray-700 border p-2 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
/>

  <small className="text-gray-500">
    Upload files in PDF, JPEG, or PNG format.
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