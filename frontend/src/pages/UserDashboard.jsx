import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  FaHome,
  FaBriefcase,
  FaSave,
  FaUser,
  FaKey,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify"; // ✅ Import Toastify here
import "react-toastify/dist/ReactToastify.css"; // ✅ Import styles

const UserDashboard = ({ setIsAuthenticated }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // ✅ Show Logout Confirmation
  const confirmLogout = () => {
    toast.warn(
      <div className="text-center">
        <p className="mb-2">Are you sure you want to logout?</p>
        <div className="flex justify-center space-x-3">
          <button
            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-700"
            onClick={() => {
              toast.dismiss("logout-toast"); // Close the toast
              handleLogout();
            }}
          >
            Logout
          </button>
          <button
            className="bg-gray-300 text-black px-4 py-1 rounded hover:bg-gray-400"
            onClick={() => toast.dismiss("logout-toast")}
          >
            Cancel
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        hideProgressBar: true,
        closeButton: false,
        toastId: "logout-toast",
      }
    );
  };

  // ✅ Proper Logout Function
  const handleLogout = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        navigate("/login"); // Redirect to login page
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 font">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white text-gray-700 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:translate-x-0 border-r-2 border-gray-150 py-4`}
      >
        {/* Sidebar Header */}
        <div className="sticky top-0 pt-20">
          <button className="text-white text-2xl md:hidden" onClick={toggleSidebar}>
            <FaTimes />
          </button>
        </div>

        {/* Sidebar Links */}
        <nav className="flex flex-col space-y-6 p-6 pt-6 mt-4 overflow-y-auto h-[calc(100vh-64px)]">
          <Link to="" className="flex items-center space-x-4 p-3 text-base font-medium rounded hover:bg-green-100">
            <FaHome className="text-green-600 text-xl" />
            <span>Dashboard</span>
          </Link>
          <Link to="browse-jobs" className="flex items-center space-x-4 p-3 text-base font-medium rounded hover:bg-green-100">
            <FaBriefcase className="text-green-600 text-xl" />
            <span>Browse Jobs</span>
          </Link>
          <Link to="profile" className="flex items-center space-x-4 p-3 text-base font-medium rounded hover:bg-green-100">
            <FaUser className="text-green-600 text-xl" />
            <span>Application form</span>
          </Link>
          <Link to="my-applications" className="flex items-center space-x-4 p-3 text-base font-medium rounded hover:bg-green-100">
            <FaSave className="text-green-600 text-xl" />
            <span>My Applications</span>
          </Link>
          <Link to="saved-jobs" className="flex items-center space-x-4 p-3 text-base font-medium rounded hover:bg-green-100">
            <FaSave className="text-green-600 text-xl" />
            <span>Saved Jobs</span>
          </Link>
        
          <Link to="change-password" className="flex items-center space-x-4 p-3 text-base font-medium rounded hover:bg-green-100">
            <FaKey className="text-green-600 text-xl" />
            <span>Change Password</span>
          </Link>

          {/* ✅ Logout Button with Confirmation */}
          <button
            onClick={confirmLogout}
            className="flex items-center space-x-4 p-3 text-base font-medium rounded hover:bg-red-100 w-full text-left"
          >
            <FaSignOutAlt className="text-red-500 text-xl" />
            <span>Logout</span>
          </button>
        </nav>
      </div>

      {/* Overlay for Sidebar */}
      {isSidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" onClick={toggleSidebar}></div>}

      {/* Main Area */}
      <div className="flex-grow p-6 md:ml-72 md:px-8 overflow-y-auto">
        {/* Toggle Button for Small Screens */}
        <div className="md:hidden mb-4">
          <button onClick={toggleSidebar} className="text-green-600 text-2xl p-2 focus:outline-none z-50">
            <FaBars />
          </button>
        </div>
        <Outlet />
      </div>

      {/* ✅ Toast Container (Only in this Component) */}
      <ToastContainer />
    </div>
  );
};

export default UserDashboard;
