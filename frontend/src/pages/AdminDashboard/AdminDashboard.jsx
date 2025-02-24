import React, { useState, useEffect } from "react";
import { FaBriefcase, FaUsers, FaFileAlt } from "react-icons/fa";

const AdminDashboard = () => {
  const [totalJobs, setTotalJobs] = useState(0);
  const [totalApplications, setTotalApplications] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [applicationStatus, setApplicationStatus] = useState({
    Pending: 0,
    Accepted: 0,
    Rejected: 0,
  });

  // Fetch job applications and their status counts
  useEffect(() => {
    const fetchApplicationsCount = async () => {
      try {
        const response = await fetch("/admin/job-applications", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        if (data.status_counts) {
          setApplicationStatus(data.status_counts);
          setTotalApplications(data.applications.length);
        } else {
          throw new Error("Invalid data format received");
        }
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchApplicationsCount();
  }, []);

  // Fetch total jobs and users (existing code)
  useEffect(() => {
    const fetchJobsCount = async () => {
      try {
        const response = await fetch("/api/jobs");
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }
        const data = await response.json();
        setTotalJobs(data.jobs.length);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobsCount();
  }, []);

  useEffect(() => {
    const fetchUsersCount = async () => {
      try {
        const response = await fetch("/users", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        if (Array.isArray(data)) {
          setTotalUsers(data.length);
        } else {
          throw new Error("Invalid data format received");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsersCount();
  }, []);

  // Helper function to calculate percentages for pie chart
  const calculatePercentage = (value, total) => {
    return ((value / total) * 100).toFixed(2);
  };

  // Calculate totals for pie chart
  const totalApplicationsData = Object.values(applicationStatus).reduce((acc, value) => acc + value, 0);

  return (
    <div className="p-6 sm:p-8 bg-gray-50 min-h-screen font">
      {/* Dashboard Header */}
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8">
        Adminstrator Dashboard
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8">
        {/* Total Jobs */}
        <div className="flex items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="p-4 bg-green-100 rounded-full">
            <FaBriefcase className="text-3xl text-green-600" />
          </div>
          <div className="ml-4">
            <h2 className="text-lg font-semibold text-gray-700">Total Jobs</h2>
            <p className="text-2xl font-bold text-gray-900">{totalJobs}</p>
          </div>
        </div>

        {/* Total Applications */}
        <div className="flex items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="p-4 bg-blue-100 rounded-full">
            <FaFileAlt className="text-3xl text-green-600" />
          </div>
          <div className="ml-4">
            <h2 className="text-lg font-semibold text-black">Applications</h2>
            <p className="text-2xl font-bold text-gray-900">{totalApplications}</p>
          </div>
        </div>

        {/* Registered Users */}
        <div className="flex items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="p-4 bg-yellow-100 rounded-full">
            <FaUsers className="text-3xl text-red-600" />
          </div>
          <div className="ml-4">
            <h2 className="text-lg font-semibold text-gray-700">Registered Users</h2>
            <p className="text-2xl font-bold text-gray-900">{totalUsers}</p>
          </div>
        </div>
      </div>

      {/* Application Status Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Application Status</h2>

        {/* Pie Chart */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Applications status</h3>
          <div className="flex justify-center">
            <div className="relative w-48 h-48">
              {Object.entries(applicationStatus).map(([status, count], index) => {
                const percentage = calculatePercentage(count, totalApplicationsData);
                const rotation = index === 0 ? 0 : Object.values(applicationStatus).slice(0, index).reduce((acc, curr) => acc + (curr / totalApplicationsData) * 360, 0);
                return (
                  <div
                    key={status}
                    className="absolute inset-0"
                    style={{
                      clipPath: `polygon(50% 50%, 100% 50%, 100% 0%, 50% 0%)`,
                      transform: `rotate(${rotation}deg)`,
                      backgroundColor:
                        status === "Pending"
                          ? "#3B82F6"
                          : status === "Accepted"
                          ? "#10B981"
                          : "#EF4444",
                    }}
                  ></div>
                );
              })}
            </div>
          </div>
          <div className="mt-4 flex justify-center space-x-4">
            {Object.entries(applicationStatus).map(([status, count]) => (
              <div key={status} className="flex items-center">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{
                    backgroundColor:
                      status === "Pending"
                        ? "#3B82F6"
                        : status === "Accepted"
                        ? "#10B981"
                        : "#EF4444",
                  }}
                ></div>
                <div className="ml-2 text-sm text-gray-600">
                  {status} ({calculatePercentage(count, totalApplicationsData)}%)
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;