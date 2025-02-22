import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify"; // Import react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import react-toastify styles

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
  const handleSubmit = async (e) => {
    e.preventDefault();

    // API URL
    const API_URL = "http://127.0.0.1:5000/next-of-kin"; 

    // Prepare the data for submission (only send non-empty kin)
    const kinData = [
      {
        kin_name: formData.kin1_name,
        kin_address: formData.kin1_address,
        kin_tel: formData.kin1_tel,
        kin_relationship: formData.kin1_relationship,
      },
      {
        kin_name: formData.kin2_name,
        kin_address: formData.kin2_address,
        kin_tel: formData.kin2_tel,
        kin_relationship: formData.kin2_relationship,
      },
    ].filter((kin) => kin.kin_name && kin.kin_address && kin.kin_tel && kin.kin_relationship);

    if (kinData.length === 0) {
      toast.error("Please fill in at least one Next of Kin details.", {
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
      for (const kin of kinData) {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Ensures cookies are sent
          body: JSON.stringify(kin),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Failed to add Next of Kin");
        }
      }

      // Show success toast
      toast.success("Next of Kin details saved successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Redirect to profile page after a short delay
      setTimeout(() => {
        navigate("/dashboard/profile");
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      console.error("Error:", error.message);

      // Show error toast
      toast.error(error.message || "Failed to save Next of Kin details.", {
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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

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
                type="number"
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

        {/* Next of Kin 2 (Optional) */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-700">Next of Kin 2 (Optional)</h2>
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
                type="number"
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