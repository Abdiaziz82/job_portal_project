import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const AdminSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative">
      {/* Toggle Button for Small Screens */}
      <button
        className="sm:hidden fixed top-11 left-4 z-50 bg-green-700 text-white p-2 rounded-full shadow-lg"
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-green-900 text-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 sm:relative sm:w-64 z-40`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="bg-green-800 py-6 px-4">
            <h1 className="text-xl font-semibold text-center">Admin </h1>
          </div>

          {/* Sidebar Navigation */}
          <nav className="flex-grow px-4 py-8">
            <ul className="space-y-4">
              <li>
                <NavLink
                  to="/admin/dashboard"
                  className={({ isActive }) =>
                    isActive
                      ? "block py-3 px-4 rounded-lg bg-green-700 font-medium text-lg"
                      : "block py-3 px-4 rounded-lg hover:bg-green-700 hover:font-medium text-lg transition-all"
                  }
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/dashboard/manage-jobs"
                  className={({ isActive }) =>
                    isActive
                      ? "block py-3 px-4 rounded-lg bg-green-700 font-medium text-lg"
                      : "block py-3 px-4 rounded-lg hover:bg-green-700 hover:font-medium text-lg transition-all"
                  }
                >
                  Manage Jobs
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/dashboard/created-jobs"
                  className={({ isActive }) =>
                    isActive
                      ? "block py-3 px-4 rounded-lg bg-green-700 font-medium text-lg"
                      : "block py-3 px-4 rounded-lg hover:bg-green-700 hover:font-medium text-lg transition-all"
                  }
                >
                  Created Jobs
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/dashboard/view-applications"
                  className={({ isActive }) =>
                    isActive
                      ? "block py-3 px-4 rounded-lg bg-green-700 font-medium text-lg"
                      : "block py-3 px-4 rounded-lg hover:bg-green-700 hover:font-medium text-lg transition-all"
                  }
                >
                  View Applications
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/dashboard/manage-users"
                  className={({ isActive }) =>
                    isActive
                      ? "block py-3 px-4 rounded-lg bg-green-700 font-medium text-lg"
                      : "block py-3 px-4 rounded-lg hover:bg-green-700 hover:font-medium text-lg transition-all"
                  }
                >
                  Manage Users
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* Sidebar Footer */}
          <div className="bg-green-800 py-4 px-4 text-center">
            <p className="text-sm font-light">© 2025 University Admin</p>
          </div>
        </div>
      </aside>

      {/* Sidebar Overlay for Small Screens */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 sm:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default AdminSidebar;
