import React, { useEffect, useState } from "react";

const ViewApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/admin/job-applications", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setApplications(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching applications:", error);
        setLoading(false);
      });
  }, []);

  const handleStatusUpdate = (id, status) => {
    fetch(`http://127.0.0.1:5000/admin/job-applications/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ status }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert(`Error: ${data.error}`);
        } else {
          alert(`Application ${status} successfully!`);
          setApplications((prev) =>
            prev.map((app) => (app.id === id ? { ...app, status } : app))
          );
        }
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-green-700 mb-4">Job Applications</h2>

      {loading ? (
        <p className="text-gray-500">Loading applications...</p>
      ) : applications.length === 0 ? (
        <p className="text-gray-500">No job applications found.</p>
      ) : (
        <table className="w-full bg-white border rounded-lg shadow-md">
          <thead className="bg-green-700 text-white">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Applicant Name</th>
              <th className="p-3">Job Title</th>
              <th className="p-3">Status</th>
              <th className="p-3">Applied At</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app, index) => (
              <tr key={app.id} className="border-b hover:bg-gray-100">
                <td className="p-3 text-center">{index + 1}</td>
                <td className="p-3">{app.applicant_name}</td>
                <td className="p-3">{app.job_title}</td>
                <td className="p-3 font-semibold">{app.status}</td>
                <td className="p-3">{app.applied_at}</td>
                <td className="p-3">
                  <button
                    className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 mr-2"
                    onClick={() => handleStatusUpdate(app.id, "Accepted")}
                  >
                    Accept
                  </button>
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700"
                    onClick={() => handleStatusUpdate(app.id, "Rejected")}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewApplications;
