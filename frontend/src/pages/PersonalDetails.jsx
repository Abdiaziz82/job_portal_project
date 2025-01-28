import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function PersonalDetails() {
  const navigate = useNavigate();
  const counties = [
    "Baringo", "Bomet", "Bungoma", "Busia", "Elgeyo-Marakwet",
    "Embu", "Garissa", "Homa Bay", "Isiolo", "Kajiado", "Kakamega",
    "Kericho", "Kiambu", "Kilifi", "Kirinyaga", "Kisii", "Kisumu",
    "Kitui", "Kwale", "Laikipia", "Lamu", "Machakos", "Makueni",
    "Mandera", "Marsabit", "Meru", "Migori", "Mombasa", "Murang'a",
    "Nairobi", "Nakuru", "Nandi", "Narok", "Nyamira", "Nyandarua",
    "Nyeri", "Samburu", "Siaya", "Taita-Taveta", "Tana River",
    "Tharaka-Nithi", "Trans Nzoia", "Turkana", "Uasin Gishu",
    "Vihiga", "Wajir", "West Pokot"
  ];
  const titles = ["Mr.", "Mrs.", "Miss", "Dr.", "Prof."];

  // State to manage form data
  const [formData, setFormData] = useState({
    full_names: "",
    title: "",
    date_of_birth: "",
    id_number: "",
    gender: "",
    nationality: "",
    home_county: "",
    constituency: "",
    postal_address: "",
    mobile_number: "",
    email_address: ""
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Send POST request to the backend
      const response = await fetch("http://localhost:5000/personal-details", {
        method: "POST",
        credentials: "include", // Include cookies for JWT authentication
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        const errorData = await response.json(); // Parse error response
        throw new Error(errorData.error || "Failed to save personal details");
      }
  
      const result = await response.json();
      alert(result.message); // Show success message
      navigate("/"); // Redirect to home or another page
    } catch (error) {
      console.error("Error:", error);
      alert(error.message || "An error occurred while saving personal details.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen p-6 bg-gray-50">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-green-700 hover:text-green-800 transition mb-4"
      >
        <FaArrowLeft className="mr-2" />
        Back
      </button>

      {/* Form Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Personal Details</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-6">
        {/* Full Names & Title */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Full Names</label>
            <input
              type="text"
              name="full_names"
              placeholder="Enter your full names"
              value={formData.full_names}
              onChange={handleChange}
              className="w-full p-3 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Title</label>
            <select
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              required
            >
              <option value="">Select Title</option>
              {titles.map((title) => (
                <option key={title} value={title}>
                  {title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Date of Birth & ID Number */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Date of Birth</label>
            <input
              type="date"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleChange}
              className="w-full p-3 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">ID Number</label>
            <input
              type="text"
              name="id_number"
              placeholder="Enter your ID number"
              value={formData.id_number}
              onChange={handleChange}
              className="w-full p-3 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>

        {/* Gender */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-3 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        {/* Nationality & Home County */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Nationality</label>
            <input
              type="text"
              name="nationality"
              placeholder="Enter your nationality"
              value={formData.nationality}
              onChange={handleChange}
              className="w-full p-3 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Home County</label>
            <select
              name="home_county"
              value={formData.home_county}
              onChange={handleChange}
              className="w-full p-3 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 appearance-none"
              required
            >
              <option value="">Select County</option>
              {counties.map((county) => (
                <option key={county} value={county}>
                  {county}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Constituency & Postal Address */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Constituency</label>
            <input
              type="text"
              name="constituency"
              placeholder="Enter your constituency"
              value={formData.constituency}
              onChange={handleChange}
              className="w-full p-3 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Postal Address</label>
            <input
              type="text"
              name="postal_address"
              placeholder="Enter your postal address"
              value={formData.postal_address}
              onChange={handleChange}
              className="w-full p-3 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>

        {/* Mobile Number & Email Address */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Mobile Number</label>
            <input
              type="tel"
              name="mobile_number"
              placeholder="Enter your mobile number"
              value={formData.mobile_number}
              onChange={handleChange}
              className="w-full p-3 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Email Address</label>
            <input
              type="email"
              name="email_address"
              placeholder="Enter your email address"
              value={formData.email_address}
              onChange={handleChange}
              className="w-full p-3 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
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