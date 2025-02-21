import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function PublicationsForm() {
  const navigate = useNavigate();
  const [publications, setPublications] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setPublications(e.target.value);
  };

  // Submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/publications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Ensures JWT in cookies is sent
        body: JSON.stringify({ publications }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Publications added successfully!");
        navigate(-1); // Navigate back after successful submission
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error submitting publications:", error);
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
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Publications in Refereed Journal(s) (for Teaching Positions Applicants)
      </h1>

      {/* Publications Form */}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-6">
        {/* Publications Textarea */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Publications in Refereed Journal(s)
          </label>
          <textarea
            name="publications"
            value={publications}
            onChange={handleChange}
            rows="6"
            placeholder="List your publications in refereed journals..."
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