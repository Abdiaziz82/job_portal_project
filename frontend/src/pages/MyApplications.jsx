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
    <div className="container mx-auto mt-12 px-4 md:px-8">
      <h2 className="text-2xl md:text-3xl font-bold text-green-700 text-center">
        My Job Applications
      </h2>

      {applications.length === 0 ? (
        <p className="text-center text-gray-500 mt-6">
          You don't have any job applications yet.
        </p>
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
          <div className="md:hidden space-y-4">
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