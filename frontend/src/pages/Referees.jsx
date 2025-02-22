import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Referees() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    referee1: {
      full_name: "",
      occupation: "",
      address: "",
      post_code: "",
      city_town: "",
      mobile_no: "",
      email: "",
      known_period: "",
    },
    referee2: {
      full_name: "",
      occupation: "",
      address: "",
      post_code: "",
      city_town: "",
      mobile_no: "",
      email: "",
      known_period: "",
    },
  });

  // Handle input changes
  const handleChange = (e, referee, field) => {
    setFormData((prev) => ({
      ...prev,
      [referee]: {
        ...prev[referee],
        [field]: e.target.value,
      },
    }));
  };

  // Submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5000/add-referees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Ensures JWT in cookies is sent
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Referees added successfully!");
        navigate(-1);
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error submitting referees:", error);
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
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Referees</h1>

      {/* Referees Form */}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-10">
        {["referee1", "referee2"].map((referee, index) => (
          <div key={referee}>
            <h2 className="text-2xl font-semibold text-green-700 mb-4">
              Referee {index + 1}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData[referee].full_name}
                  onChange={(e) => handleChange(e, referee, "full_name")}
                  className="w-full p-3 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Occupation
                </label>
                <input
                  type="text"
                  value={formData[referee].occupation}
                  onChange={(e) => handleChange(e, referee, "occupation")}
                  className="w-full p-3 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Address
                </label>
                <input
                  type="text"
                  value={formData[referee].address}
                  onChange={(e) => handleChange(e, referee, "address")}
                  className="w-full p-3 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Post Code
                </label>
                <input
                  type="number"
                  value={formData[referee].post_code}
                  onChange={(e) => handleChange(e, referee, "post_code")}
                  className="w-full p-3 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  City/Town
                </label>
                <input
                  type="text"
                  value={formData[referee].city_town}
                  onChange={(e) => handleChange(e, referee, "city_town")}
                  className="w-full p-3 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Mobile No
                </label>
                <input
                  type="number"
                  value={formData[referee].mobile_no}
                  onChange={(e) => handleChange(e, referee, "mobile_no")}
                  className="w-full p-3 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  E-mail Address
                </label>
                <input
                  type="email"
                  value={formData[referee].email}
                  onChange={(e) => handleChange(e, referee, "email")}
                  className="w-full p-3 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Known Period
                </label>
                <input
                  type="text"
                  value={formData[referee].known_period}
                  onChange={(e) => handleChange(e, referee, "known_period")}
                  className="w-full p-3 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
            </div>
          </div>
        ))}

        {/* Save Button */}
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
}
