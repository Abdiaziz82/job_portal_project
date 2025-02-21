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
          you don't have job applications yet
        </p>
      ) : (
        <div className="mt-6 bg-white p-4 md:p-6 rounded-lg shadow-lg overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-green-700 text-white">
                <th className="p-2 md:p-3 text-left">Job Name</th>
                <th className="p-2 md:p-3 text-left">Time Applied</th>
                <th className="p-2 md:p-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id} className="border-b">
                  <td className="p-2 md:p-3">{app.job_title}</td>
                  <td className="p-2 md:p-3">{app.applied_at}</td>
                  <td className="p-2 md:p-3">
                    <span
                      className={`px-2 py-1 md:px-3 md:py-1 rounded-lg text-white text-xs md:text-sm ${
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
      )}
    </div>
  );
}