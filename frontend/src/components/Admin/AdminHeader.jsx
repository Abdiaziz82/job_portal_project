import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminHeader = () => {
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = async () => {
    try {
      // Send a request to the server to log out and delete the JWT cookie
      await axios.post('http://localhost:5000/admin/logout', {}, { withCredentials: true });

      // Clear admin JWT cookie from the browser (in case the backend didn't clear it)
      document.cookie = "admin_jwt=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

      // Redirect the admin to the login page
      navigate("/admin/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="bg-green-900 text-white p-4 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-bold">Admin Dashboard</h1>
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition ease-in-out duration-300 transform hover:scale-105"
      >
        <span className="font-semibold">Logout</span>
      </button>
    </header>
  );
};

export default AdminHeader;
