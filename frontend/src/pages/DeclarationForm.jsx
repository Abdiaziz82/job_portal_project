import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export default function DeclarationForm() {
  const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [name, setName] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "date") setDate(value);
    else if (name === "name") setName(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/declarations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies for authentication
        body: JSON.stringify({ date, name }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Declaration added successfully!");
        navigate(-1); // Navigate back after successful submission
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error submitting declaration:", error);
      alert("An error occurred. Please try again.");
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
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Declaration Form</h1>

      {/* Certification Statement */}
      <div className="bg-white p-8 rounded-lg shadow-md space-y-6 mb-6">
        <p className="text-gray-700">
          I certify that the particulars given on this form are correct and
          understand that any incorrect/misleading information may lead to
          disqualification and/or legal action.
        </p>
      </div>

      {/* Declaration Form */}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-6">
        {/* Date Input */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Date</label>
          <input
            type="date"
            name="date"
            value={date}
            onChange={handleChange}
            className="w-full p-3 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>

        {/* Name Input (Signature) */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Signature of the Applicant
          </label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full p-3 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>

        {/* Save Button */}
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