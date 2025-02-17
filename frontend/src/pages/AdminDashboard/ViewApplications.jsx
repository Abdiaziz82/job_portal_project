import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:5000/admin/job-applications", {
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch applications");
        return response.json();
      })
      .then((data) => {
        if (data.applications && Array.isArray(data.applications)) {
          setApplications(data.applications);
        } else {
          throw new Error("Invalid data format: applications array not found");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching applications:", error);
        setError(error.message);
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
          toast.error(`Error: ${data.error}`);
        } else {
          toast.success(`Application ${status} successfully!`);
          setApplications((prev) =>
            prev.map((app) => (app.id === id ? { ...app, status } : app))
          );
        }
      })
      .catch((error) => {
        console.error("Error updating status:", error);
        toast.error("Failed to update application status.");
      });
  };

  const confirmAction = (id, status) => {
    toast.info(
      <div>
        <p>Are you sure you want to {status.toLowerCase()} this application?</p>
        <div className="flex justify-center gap-4 mt-2">
          <button
            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
            onClick={() => {
              toast.dismiss();
              handleStatusUpdate(id, status);
            }}
          >
            Yes
          </button>
          <button
            className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
            onClick={() => toast.dismiss()}
          >
            Cancel
          </button>
        </div>
      </div>,
      { position: "top-center", autoClose: false, closeOnClick: false }
    );
  };

  return (
    <div className="container mx-auto p-6">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="text-2xl font-bold text-green-700 mb-4">Job Applications</h2>

      {loading ? (
        <p className="text-gray-500">Loading applications...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
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
                  <div className="flex items-center gap-2">
                    {app.status !== "Accepted" && app.status !== "Rejected" ? (
                      <>
                        <button
                          className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700"
                          onClick={() => confirmAction(app.id, "Accepted")}
                        >
                          Accept
                        </button>
                        <button
                          className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700"
                          onClick={() => confirmAction(app.id, "Rejected")}
                        >
                          Reject
                        </button>
                      </>
                    ) : null}
                    <button
                      className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
                      onClick={() => {
                        if (!app.user_id) {
                          toast.error("User ID not found. Please check the application data.");
                          return;
                        }
                        navigate(`/admin/dashboard/view-profile/${app.user_id}`);
                      }}
                    >
                      View Profile
                    </button>
                  </div>
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
