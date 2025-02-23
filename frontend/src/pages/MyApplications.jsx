import React, { useEffect, useState } from "react";

export default function MyApplications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/user/job-applications", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setApplications(data))
      .catch((error) => console.error("Error fetching applications:", error));
  }, []);

  return (
    <div className="container mx-auto mt-12 px-4 md:px-8 pb-20"> {/* Added pb-20 for bottom padding */}
      <h2 className="text-2xl md:text-3xl font-bold text-green-700 text-center">
        My Job Applications
      </h2>

      {applications.length === 0 ? (
        <div className="col-span-full flex flex-col items-center justify-center p-8 bg-white shadow-lg rounded-lg border border-gray-100 mt-6">
          <svg
            className="w-16 h-16 text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
          <h3 className="text-2xl font-bold text-gray-700 mb-2">
            No Job Applications
          </h3>
          <p className="text-gray-500 text-center mb-4">
            You don't have any job applications yet. Start applying to jobs that
            match your skills and interests.
          </p>
          <button
            className="mt-4 bg-gradient-to-r from-green-600 to-green-700 text-white py-2 px-6 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300"
            onClick={() => (window.location.href = "/dashboard/browse-jobs")}
          >
            Browse Jobs
          </button>
        </div>
      ) : (
        <div className="mt-6">
          {/* Desktop Table */}
          <div className="hidden md:block bg-white p-6 rounded-lg shadow-lg overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-green-700 text-white">
                  <th className="p-3 text-left">Job Name</th>
                  <th className="p-3 text-left">Time Applied</th>
                  <th className="p-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{app.job_title}</td>
                    <td className="p-3">{app.applied_at}</td>
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-lg text-white text-sm ${
                          app.status === "Pending"
                            ? "bg-yellow-500"
                            : app.status === "Accepted"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4 mb-8"> {/* Added mb-8 for bottom margin */}
            {applications.map((app) => (
              <div
                key={app.id}
                className="bg-white p-4 rounded-lg shadow-md"
              >
                <div className="space-y-2">
                  <div>
                    <span className="font-semibold">Job Name:</span>{" "}
                    {app.job_title}
                  </div>
                  <div>
                    <span className="font-semibold">Time Applied:</span>{" "}
                    {app.applied_at}
                  </div>
                  <div>
                    <span className="font-semibold">Status:</span>{" "}
                    <span
                      className={`px-2 py-1 rounded-lg text-white text-xs ${
                        app.status === "Pending"
                          ? "bg-yellow-500"
                          : app.status === "Accepted"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {app.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}