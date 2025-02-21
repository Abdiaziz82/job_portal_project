import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export default function DutiesForm() {
  const navigate = useNavigate();
  const [duties, setDuties] = useState("");

  const handleChange = (e) => {
    setDuties(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/duties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies for authentication
        body: JSON.stringify({ duties }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Duties added successfully!");
        navigate(-1); // Navigate back after successful submission
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error submitting duties:", error);
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
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Add Duties</h1>

      {/* Duties Form */}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-6">
        {/* Duties Textarea */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
          Please give details of your abilities, skills and experience which you consider relevant to the position applied for. This information may include
          an outline of your most recent achievements and your reasons for applying for this post
          </label>
          <textarea
            name="duties"
            value={duties}
            onChange={handleChange}
            rows="6"
            placeholder="Describe your duties and responsibilities..."
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