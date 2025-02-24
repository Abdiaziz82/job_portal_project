import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  
    // Validate grossSalary is a number
    const grossSalary = parseFloat(employmentDetails.grossSalary);
    if (isNaN(grossSalary)) { // Corrected line
      toast.error("Gross salary must be a valid number.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
  
    try {
      const response = await fetch("/employment-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Ensures cookies (JWT) are sent
        body: JSON.stringify({
          year: employmentDetails.year,
          designation: employmentDetails.designation,
          job_group: employmentDetails.jobGroup,
          gross_salary: grossSalary, // Use the validated grossSalary
          ministry: employmentDetails.ministry,
          from_date: employmentDetails.fromDate,
          to_date: employmentDetails.toDate,
          duties: employmentDetails.duties,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Show success toast
        toast.success("Employment details added successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
  
        // Clear the form after successful submission
        setEmploymentDetails({
          year: "",
          designation: "",
          jobGroup: "",
          grossSalary: "",
          ministry: "",
          fromDate: "",
          toDate: "",
          duties: "",
        });
  
        // Navigate to the profile page after a delay
        setTimeout(() => {
          navigate("/dashboard/profile");
        }, 3000); // Wait for 3 seconds before navigating
      } else {
        // Handle backend errors (e.g., validation errors)
        toast.error(data.error || "An error occurred. Please try again.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
  
      // Show a generic error toast for unexpected errors
      toast.error("Something went wrong. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen p-6 bg-gray-50">
      {/* Toast Container */}
      <ToastContainer />

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
              required
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
              required
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
              required
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
              required
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
              required
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
                required
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
                required
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
            required
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