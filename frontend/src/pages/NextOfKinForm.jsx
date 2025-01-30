import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

export default function NextOfKinForm() {
  const navigate = useNavigate();

  // State to manage form data
  const [formData, setFormData] = useState({
    kin1_name: "",
    kin1_address: "",
    kin1_tel: "",
    kin1_relationship: "",
    kin2_name: "",
    kin2_address: "",
    kin2_tel: "",
    kin2_relationship: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("Next of Kin details saved successfully!");
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
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Next of Kin Details</h1>

      {/* Form */}
      <form className="bg-white p-8 rounded-lg shadow-md space-y-6" onSubmit={handleSubmit}>
        {/* Next of Kin 1 */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-700">Next of Kin 1</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Name</label>
              <input
                type="text"
                name="kin1_name"
                value={formData.kin1_name}
                onChange={handleChange}
                placeholder="Enter name"
                className="w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Address</label>
              <input
                type="text"
                name="kin1_address"
                value={formData.kin1_address}
                onChange={handleChange}
                placeholder="Enter address"
                className="w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Tel. No</label>
              <input
                type="tel"
                name="kin1_tel"
                value={formData.kin1_tel}
                onChange={handleChange}
                placeholder="Enter telephone number"
                className="w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Relationship</label>
              <input
                type="text"
                name="kin1_relationship"
                value={formData.kin1_relationship}
                onChange={handleChange}
                placeholder="Enter relationship"
                className="w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Next of Kin 2 */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-700">Next of Kin 2</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Name</label>
              <input
                type="text"
                name="kin2_name"
                value={formData.kin2_name}
                onChange={handleChange}
                placeholder="Enter name"
                className="w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Address</label>
              <input
                type="text"
                name="kin2_address"
                value={formData.kin2_address}
                onChange={handleChange}
                placeholder="Enter address"
                className="w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Tel. No</label>
              <input
                type="tel"
                name="kin2_tel"
                value={formData.kin2_tel}
                onChange={handleChange}
                placeholder="Enter telephone number"
                className="w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Relationship</label>
              <input
                type="text"
                name="kin2_relationship"
                value={formData.kin2_relationship}
                onChange={handleChange}
                placeholder="Enter relationship"
                className="w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
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
