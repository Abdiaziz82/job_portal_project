import { useState } from "react";

const ProfessionalQualificationsForm = ({ onSubmit }) => {
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

  // Add new qualification row
  const addQualification = () => {
    setQualifications([...qualifications, { yearFrom: "", yearTo: "", institution: "", award: "", specialization: "", grade: "" }]);
  };

  // Remove qualification row
  const removeQualification = (index) => {
    const newQualifications = qualifications.filter((_, i) => i !== index);
    setQualifications(newQualifications);
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted Data:", qualifications);
    setSuccessMessage("Qualifications saved successfully!");
    onSubmit && onSubmit(qualifications);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Professional/Technical Qualifications</h2>
      {successMessage && <p className="text-green-600 text-center mb-4">{successMessage}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {qualifications.map((qualification, index) => (
          <div key={index} className="border p-4 rounded-md shadow-sm bg-gray-50">
            <div className="grid grid-cols-2 gap-4">
              {/* Year From */}
              <div>
                <label className="block text-gray-700 font-medium">From</label>
                <input
                  type="number"
                  name="yearFrom"
                  value={qualification.yearFrom}
                  onChange={(event) => handleInputChange(index, event)}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="Year"
                  required
                />
              </div>

              {/* Year To */}
              <div>
                <label className="block text-gray-700 font-medium">To</label>
                <input
                  type="number"
                  name="yearTo"
                  value={qualification.yearTo}
                  onChange={(event) => handleInputChange(index, event)}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="Year"
                  required
                />
              </div>
            </div>

            {/* Institution */}
            <div className="mt-3">
              <label className="block text-gray-700 font-medium">Institution</label>
              <input
                type="text"
                name="institution"
                value={qualification.institution}
                onChange={(event) => handleInputChange(index, event)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Institution Name"
                required
              />
            </div>

            {/* Award */}
            <div className="mt-3">
              <label className="block text-gray-700 font-medium">Award/Attainment</label>
              <input
                type="text"
                name="award"
                value={qualification.award}
                onChange={(event) => handleInputChange(index, event)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Diploma, Certificate"
                required
              />
            </div>

            {/* Specialization */}
            <div className="mt-3">
              <label className="block text-gray-700 font-medium">Specialization/Subject</label>
              <input
                type="text"
                name="specialization"
                value={qualification.specialization}
                onChange={(event) => handleInputChange(index, event)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Human Resource, Engineering"
                required
              />
            </div>

            {/* Class/Grade */}
            <div className="mt-3">
              <label className="block text-gray-700 font-medium">Class/Grade</label>
              <input
                type="text"
                name="grade"
                value={qualification.grade}
                onChange={(event) => handleInputChange(index, event)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
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
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 mt-4 transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProfessionalQualificationsForm;
