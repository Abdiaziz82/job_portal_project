import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedJobTitle, setSelectedJobTitle] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/admin/job-applications", {
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
    fetch(`/admin/job-applications/${id}`, {
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
        <p>Are you sure you want to mark this application as {status.toLowerCase()}?</p>
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

  const filteredApplications = applications.filter((app) => {
    const matchesJobTitle = selectedJobTitle ? app.job_title === selectedJobTitle : true;
    const matchesStatus = selectedStatus ? app.status === selectedStatus : true;
    return matchesJobTitle && matchesStatus;
  });

  const jobTitles = [...new Set(applications.map((app) => app.job_title))];

  return (
    <div className="container mx-auto p-6 font">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="text-2xl font-bold text-green-700 mb-4">Job Applications</h2>

      {/* Search and Filter Section */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <select
          className="p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-auto"
          value={selectedJobTitle}
          onChange={(e) => setSelectedJobTitle(e.target.value)}
        >
          <option value="">All Job Titles</option>
          {jobTitles.map((title, index) => (
            <option key={index} value={title}>
              {title}
            </option>
          ))}
        </select>

        <select
          className="p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-auto"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Accepted">Accepted</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading applications...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : filteredApplications.length === 0 ? (
        <p className="text-gray-500">No job applications found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white border rounded-lg shadow-md">
            <thead className="bg-green-700 text-white hidden sm:table-header-group">
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
              {filteredApplications.map((app, index) => (
                <tr
                  key={app.id}
                  className="border-b hover:bg-gray-100 block sm:table-row"
                >
                  <td className="p-3 text-center block sm:table-cell">
                    <span className="font-bold sm:hidden">#</span> {index + 1}
                  </td>
                  <td className="p-3 block sm:table-cell">
                    <span className="font-bold sm:hidden">Applicant Name:</span>{" "}
                    {app.applicant_name}
                  </td>
                  <td className="p-3 block sm:table-cell">
                    <span className="font-bold sm:hidden">Job Title:</span>{" "}
                    {app.job_title}
                  </td>
                  <td className="p-3 font-semibold block sm:table-cell">
                    <span className="font-bold sm:hidden">Status:</span>{" "}
                    {app.status}
                  </td>
                  <td className="p-3 block sm:table-cell">
                    <span className="font-bold sm:hidden">Applied At:</span>{" "}
                    {app.applied_at}
                  </td>
                  <td className="p-3 block sm:table-cell">
                    <div className="flex flex-col sm:flex-row items-center gap-2">
                      <button
                        className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 w-full sm:w-auto"
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
                      {app.status !== "Accepted" && app.status !== "Rejected" ? (
                        <>
                          <button
                            className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 w-full sm:w-auto"
                            onClick={() => confirmAction(app.id, "Accepted")}
                          >
                            Accept
                          </button>
                          <button
                            className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 w-full sm:w-auto"
                            onClick={() => confirmAction(app.id, "Rejected")}
                          >
                            Reject
                          </button>
                        </>
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewApplications;