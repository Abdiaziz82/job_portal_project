import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import {
  FaHome,
  FaBriefcase,
  FaSave,
  FaUser,
  FaKey, // Icon for Change Password
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const UserDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white text-gray-700 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:translate-x-0 border-r-2 border-gray-150`}
      >
        {/* Sidebar Header */}
        <div className="sticky top-0 bg-green-600 text-white p-4 flex justify-between items-center shadow-md">
          <h2 className="text-xl font-bold truncate">Dashboard</h2>
          <button
            className="text-white text-2xl md:hidden"
            onClick={toggleSidebar}
          >
            <FaTimes />
          </button>
        </div>

        {/* Sidebar Links */}
        <nav className="flex flex-col space-y-6 p-6 mt-4 overflow-y-auto h-[calc(100vh-64px)]">
          <Link
            to=""
            className="flex items-center space-x-4 p-3 text-base font-medium rounded hover:bg-green-100"
          >
            <FaHome className="text-green-600 text-xl" />
            <span>Dashboard</span>
          </Link>
          <Link
            to="browse-jobs"
            className="flex items-center space-x-4 p-3 text-base font-medium rounded hover:bg-green-100"
          >
            <FaBriefcase className="text-green-600 text-xl" />
            <span>Browse Jobs</span>
          </Link>
          <Link
            to="my-applications"
            className="flex items-center space-x-4 p-3 text-base font-medium rounded hover:bg-green-100"
          >
            <FaSave className="text-green-600 text-xl" />
            <span>My Applications</span>
          </Link>
          <Link
            to="saved-jobs"
            className="flex items-center space-x-4 p-3 text-base font-medium rounded hover:bg-green-100"
          >
            <FaSave className="text-green-600 text-xl" />
            <span>Saved Jobs</span>
          </Link>
          <Link
            to="profile"
            className="flex items-center space-x-4 p-3 text-base font-medium rounded hover:bg-green-100"
          >
            <FaUser className="text-green-600 text-xl" />
            <span>Profile</span>
          </Link>
          {/* Change Password Link */}
          <Link
            to="change-password"
            className="flex items-center space-x-4 p-3 text-base font-medium rounded hover:bg-green-100"
          >
            <FaKey className="text-green-600 text-xl" />
            <span>Change Password</span>
          </Link>
          <Link
            to="logout"
            className="flex items-center space-x-4 p-3 text-base font-medium rounded hover:bg-red-100"
          >
            <FaSignOutAlt className="text-red-500 text-xl" />
            <span>Logout</span>
          </Link>
        </nav>
      </div>

      {/* Overlay for Sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main Area */}
      <div className="flex-grow p-6 md:ml-72 md:px-8 overflow-y-auto">
        {/* Toggle Button for Small Screens */}
        <div className="md:hidden mb-4">
          <button
            onClick={toggleSidebar}
            className="text-green-600 text-2xl p-2 focus:outline-none z-50"
          >
            <FaBars />
          </button>
        </div>
        {/* Render child routes */}
        <Outlet />
      </div>
    </div>
  );
};

export default UserDashboard;