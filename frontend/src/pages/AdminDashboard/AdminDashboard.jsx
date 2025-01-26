import React from "react";
import { FaBriefcase, FaUsers, FaFileAlt } from "react-icons/fa";

const AdminDashboard = () => {
  return (
    <div className="p-6 sm:p-8 bg-gray-50 min-h-screen">
      {/* Dashboard Header */}
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8">
        Admin Dashboard
      </h1>

      {/* Summary Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Total Jobs */}
        <div className="flex items-center p-4 sm:p-6 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-lg shadow-lg">
          <div className="p-3 sm:p-4 bg-white bg-opacity-20 rounded-full">
            <FaBriefcase className="text-3xl sm:text-4xl" />
          </div>
          <div className="ml-4">
            <h2 className="text-sm sm:text-lg font-semibold">Total Jobs</h2>
            <p className="text-2xl sm:text-3xl font-bold">120</p>
          </div>
        </div>

        {/* Total Applications */}
        <div className="flex items-center p-4 sm:p-6 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg shadow-lg">
          <div className="p-3 sm:p-4 bg-white bg-opacity-20 rounded-full">
            <FaFileAlt className="text-3xl sm:text-4xl" />
          </div>
          <div className="ml-4">
            <h2 className="text-sm sm:text-lg font-semibold">Applications</h2>
            <p className="text-2xl sm:text-3xl font-bold">450</p>
          </div>
        </div>

        {/* Registered Users */}
        <div className="flex items-center p-4 sm:p-6 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-lg shadow-lg">
          <div className="p-3 sm:p-4 bg-white bg-opacity-20 rounded-full">
            <FaUsers className="text-3xl sm:text-4xl" />
          </div>
          <div className="ml-4">
            <h2 className="text-sm sm:text-lg font-semibold">Registered Users</h2>
            <p className="text-2xl sm:text-3xl font-bold">320</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
