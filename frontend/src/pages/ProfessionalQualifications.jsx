import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ProfessionalQualificationsForm = () => {
  const navigate = useNavigate();
  const [qualifications, setQualifications] = useState([
    { yearFrom: "", yearTo: "", institution: "", award: "", specialization: "", grade: "" }
  ]);

  const [successMessage, setSuccessMessage] = useState("");

  // Handle input changes
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newQualifications = [...qualifications];
    newQualifications[index][name] = value;
    setQualifications(newQualifications);
  };

  
  const addQualification = () => {
    setQualifications([...qualifications, { yearFrom: "", yearTo: "", institution: "", award: "", specialization: "", grade: "" }]);
  };

  // Remove qualification row
  const removeQualification = (index) => {
    const newQualifications = qualifications.filter((_, i) => i !== index);
    setQualifications(newQualifications);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send the qualifications data to the backend
      const response = await fetch("/professional-qualifications", {
        method: "POST",
        credentials: "include", // Include cookies for authentication
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ qualifications }), 
      });

      // Check if the response is successful
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save qualifications");
      }

      // Handle successful response
      const result = await response.json();
      setSuccessMessage(result.message); 
      alert(result.message); 

      // Clear the form after successful submission
      setQualifications([{ yearFrom: "", yearTo: "", institution: "", award: "", specialization: "", grade: "" }]);
      navigate("/dashboard/profile"); 
    } catch (error) {
      console.error("Error:", error);
      alert(error.message || "An error occurred while saving qualifications.");
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
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Professional/Technical Qualifications</h1>
      {successMessage && <p className="text-green-600 text-center mb-4">{successMessage}</p>}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-6">
        {qualifications.map((qualification, index) => (
          <div key={index} className="border p-6 rounded-md shadow-sm bg-gray-50 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Year From */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">From</label>
                <input
                  type="number"
                  name="yearFrom"
                  value={qualification.yearFrom}
                  onChange={(event) => handleInputChange(index, event)}
                  className="w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Year"
                  required
                />
              </div>

              {/* Year To */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">To</label>
                <input
                  type="number"
                  name="yearTo"
                  value={qualification.yearTo}
                  onChange={(event) => handleInputChange(index, event)}
                  className="w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Year"
                  required
                />
              </div>
            </div>

            {/* Institution */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Institution</label>
              <input
                type="text"
                name="institution"
                value={qualification.institution}
                onChange={(event) => handleInputChange(index, event)}
                className="w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter Institution Name"
                required
              />
            </div>

            {/* Award */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Award/Attainment</label>
              <input
                type="text"
                name="award"
                value={qualification.award}
                onChange={(event) => handleInputChange(index, event)}
                className="w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g. Diploma, Certificate"
                required
              />
            </div>

            {/* Specialization */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Specialization/Subject</label>
              <input
                type="text"
                name="specialization"
                value={qualification.specialization}
                onChange={(event) => handleInputChange(index, event)}
                className="w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g. Human Resource, Engineering"
                required
              />
            </div>

            {/* Class/Grade */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Class/Grade</label>
              <input
                type="text"
                name="grade"
                value={qualification.grade}
                onChange={(event) => handleInputChange(index, event)}
                className="w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g. Distinction, Credit"
                required
              />
            </div>

            {/* Remove Button */}
            {qualifications.length > 1 && (
              <button
                type="button"
                onClick={() => removeQualification(index)}
                className="mt-3 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
              >
                Remove
              </button>
            )}
          </div>
        ))}

        {/* Add More Button */}
        <button
          type="button"
          onClick={addQualification}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          + Add More
        </button>

        {/* Submit Button */}
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
};

export default ProfessionalQualificationsForm;