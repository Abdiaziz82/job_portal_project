import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

export default function EmploymentDetailsForm() {
  const navigate = useNavigate();

  const [employmentDetails, setEmploymentDetails] = useState({
    year: "",
    designation: "",
    jobGroup: "",
    grossSalary: "",
    ministry: "",
    fromDate: "",
    toDate: "",
    duties: "",
    publications: "",
    skillsExperience: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmploymentDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://127.0.0.1:5000/employment-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // ✅ Ensures cookies (JWT) are sent
        body: JSON.stringify({
          year: employmentDetails.year,
          designation: employmentDetails.designation,
          job_group: employmentDetails.jobGroup,
          gross_salary: employmentDetails.grossSalary,
          ministry: employmentDetails.ministry,
          from_date: employmentDetails.fromDate,
          to_date: employmentDetails.toDate,
          duties: employmentDetails.duties,
          publications: employmentDetails.publications,
          skills_experience: employmentDetails.skillsExperience,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert("Employment details added successfully!");
        navigate("/dashboard"); // Redirect user upon success (optional)
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong. Please try again.");
    }
  };
  ;

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
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Employment Details</h1>

      {/* Form */}
      <form
        className="bg-white p-8 rounded-lg shadow-md space-y-6"
        onSubmit={handleSubmit}
      >
        {/* Year and Designation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Year</label>
            <input
              type="text"
              name="year"
              value={employmentDetails.year}
              onChange={handleChange}
              placeholder="Enter year"
              className="w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Designation/Position
            </label>
            <input
              type="text"
              name="designation"
              value={employmentDetails.designation}
              onChange={handleChange}
              placeholder="Enter designation/position"
              className="w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Job Group and Gross Salary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Job Group/Grade/Scale
            </label>
            <input
              type="text"
              name="jobGroup"
              value={employmentDetails.jobGroup}
              onChange={handleChange}
              placeholder="Enter job group/grade/scale"
              className="w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Gross Monthly Salary (Ksh.)
            </label>
            <input
              type="text"
              name="grossSalary"
              value={employmentDetails.grossSalary}
              onChange={handleChange}
              placeholder="Enter gross monthly salary"
              className="w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Ministry and Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Ministry/State Department/Institution/Organization
            </label>
            <input
              type="text"
              name="ministry"
              value={employmentDetails.ministry}
              onChange={handleChange}
              placeholder="Enter ministry/institution"
              className="w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                From (dd-mm-yyyy)
              </label>
              <input
                type="date"
                name="fromDate"
                value={employmentDetails.fromDate}
                onChange={handleChange}
                className="w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                To (dd-mm-yyyy)
              </label>
              <input
                type="date"
                name="toDate"
                value={employmentDetails.toDate}
                onChange={handleChange}
                className="w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Duties and Responsibilities */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Briefly state your current duties, responsibilities, and assignments
          </label>
          <textarea
            name="duties"
            value={employmentDetails.duties}
            onChange={handleChange}
            rows="4"
            placeholder="Describe your duties and responsibilities..."
            className="w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>

        {/* Publications */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Publications in refereed journal(s) (for teaching positions
            applicants)
          </label>
          <textarea
            name="publications"
            value={employmentDetails.publications}
            onChange={handleChange}
            rows="4"
            placeholder="List your publications..."
            className="w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>

        {/* Skills and Experience */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Please give details of your abilities, skills, and experience
          </label>
          <textarea
            name="skillsExperience"
            value={employmentDetails.skillsExperience}
            onChange={handleChange}
            rows="4"
            placeholder="Describe your skills and experience..."
            className="w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-green-700 text-white font-medium rounded-md hover:bg-green-800 transition"
          >
            Save Details
          </button>
        </div>
      </form>
    </div>
  );
}