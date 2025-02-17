// src/components/RelevantCoursesForm.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RelevantCoursesForm = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([
    { year: "", institution: "", courseName: "", details: "", duration: "" }
  ]);
  const [professionalBodies, setProfessionalBodies] = useState([
    { bodyName: "", membershipNo: "", membershipType: "", renewalDate: "" }
  ]);
  const [successMessage, setSuccessMessage] = useState("");

  // Handle input changes for courses
  const handleCourseInputChange = (index, event) => {
    const { name, value } = event.target;
    const newCourses = [...courses];
    newCourses[index][name] = value;
    setCourses(newCourses);
  };

  // Handle input changes for professional bodies
  const handleProfessionalBodyChange = (index, event) => {
    const { name, value } = event.target;
    const newBodies = [...professionalBodies];
    newBodies[index][name] = value;
    setProfessionalBodies(newBodies);
  };

  // Add more course row
  const addCourse = () => {
    setCourses([...courses, { year: "", institution: "", courseName: "", details: "", duration: "" }]);
  };

  // Remove course row
  const removeCourse = (index) => {
    const newCourses = courses.filter((_, i) => i !== index);
    setCourses(newCourses);
  };

  // Add more professional body row
  const addProfessionalBody = () => {
    setProfessionalBodies([
      ...professionalBodies,
      { bodyName: "", membershipNo: "", membershipType: "", renewalDate: "" }
    ]);
  };

  // Remove professional body row
  const removeProfessionalBody = (index) => {
    const newBodies = professionalBodies.filter((_, i) => i !== index);
    setProfessionalBodies(newBodies);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      // Loop through each course and professional body record and send them
      const records = courses.map((course, index) => ({
        year: course.year,
        institution: course.institution,
        course_name: course.courseName,
        details: course.details,
        duration: course.duration,
        body_name: professionalBodies[index]?.bodyName || "", // Handle cases when there's no professional body
        membership_no: professionalBodies[index]?.membershipNo || "",
        membership_type: professionalBodies[index]?.membershipType || "",
        renewal_date: professionalBodies[index]?.renewalDate || "",
      }));
  
      const response = await fetch("http://127.0.0.1:5000/relevant-courses-professional-body", {
        method: "POST",
        credentials: "include", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(records), // Send both courses and professionalBodies data
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save data");
      }
  
      const result = await response.json();
      setSuccessMessage(result.message);
      alert(result.message);
  
      // Clear the form after submission
      setCourses([{ year: "", institution: "", courseName: "", details: "", duration: "" }]);
      setProfessionalBodies([{ bodyName: "", membershipNo: "", membershipType: "", renewalDate: "" }]);
      navigate("/dashboard/profile");
    } catch (error) {
      console.error("Error:", error);
      alert(error.message || "An error occurred while saving data.");
    }
  };
  

  return (
    <div className="flex flex-col min-h-screen p-6 bg-gray-50">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)} // Navigate back
        className="flex items-center text-green-600 hover:text-blue-800 mb-4"
      >
        <span className="text-xl">←</span> {/* Left arrow icon */}
        <span className="ml-2 font-medium">Back</span>
      </button>

      {/* Form Title */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Relevant Courses and Training</h1>
      {successMessage && <p className="text-green-600 text-center mb-4">{successMessage}</p>}

      {/* Courses Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-6">
        {courses.map((course, index) => (
          <div key={index} className="border p-4 rounded-md shadow-sm bg-gray-50 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Year */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Year</label>
                <input
                  type="number"
                  name="year"
                  value={course.year}
                  onChange={(event) => handleCourseInputChange(index, event)}
                  className="w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Year"
                  required
                />
              </div>

              {/* Institution */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">University/College/Institution</label>
                <input
                  type="text"
                  name="institution"
                  value={course.institution}
                  onChange={(event) => handleCourseInputChange(index, event)}
                  className="w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Institution Name"
                  required
                />
              </div>
            </div>

            {/* Course Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Name of Course</label>
              <input
                type="text"
                name="courseName"
                value={course.courseName}
                onChange={(event) => handleCourseInputChange(index, event)}
                className="w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Course Name"
                required
              />
            </div>

            {/* Details */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Details</label>
              <textarea
                name="details"
                value={course.details}
                onChange={(event) => handleCourseInputChange(index, event)}
                className="w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Details about the course"
                rows="3"
                required
              />
            </div>

            {/* Duration */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Duration</label>
              <input
                type="text"
                name="duration"
                value={course.duration}
                onChange={(event) => handleCourseInputChange(index, event)}
                className="w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g. 2 weeks, 1 month"
                required
              />
            </div>

            {/* Remove Button */}
            {courses.length > 1 && (
              <button
                type="button"
                onClick={() => removeCourse(index)}
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
          onClick={addCourse}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          + Add More
        </button>

        {/* Professional Body Form Section */}
        <h2 className="text-xl font-semibold text-gray-800 mt-10 mb-4">Current Registration/Membership to Professional Bodies</h2>
        {professionalBodies.map((body, index) => (
          <div key={index} className="border p-4 rounded-md shadow-sm bg-gray-50 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Professional Body Name */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Professional Body</label>
                <input
                  type="text"
                  name="bodyName"
                  value={body.bodyName}
                  onChange={(event) => handleProfessionalBodyChange(index, event)}
                  className="w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Professional Body"
                  required
                />
              </div>

              {/* Membership No. */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Membership No.</label>
                <input
                  type="text"
                  name="membershipNo"
                  value={body.membershipNo}
                  onChange={(event) => handleProfessionalBodyChange(index, event)}
                  className="w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Membership No."
                  required
                />
              </div>
            </div>

            {/* Membership Type */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Membership Type</label>
              <input
                type="text"
                name="membershipType"
                value={body.membershipType}
                onChange={(event) => handleProfessionalBodyChange(index, event)}
                className="w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g. Associate, Full"
                required
              />
            </div>

            {/* Date of Renewal */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Date of Renewal</label>
              <input
                type="date"
                name="renewalDate"
                value={body.renewalDate}
                onChange={(event) => handleProfessionalBodyChange(index, event)}
                className="w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Remove Professional Body Button */}
            {professionalBodies.length > 1 && (
              <button
                type="button"
                onClick={() => removeProfessionalBody(index)}
                className="mt-3 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
              >
                Remove
              </button>
            )}
          </div>
        ))}

        {/* Add More Professional Body */}
        <button
          type="button"
          onClick={addProfessionalBody}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          + Add More Professional Bodies
        </button>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-green-700 text-white font-medium rounded-md hover:bg-green-800 transition"
          >
            Save details
          </button>
        </div>
      </form>
    </div>
  );
};

export default RelevantCoursesForm;
