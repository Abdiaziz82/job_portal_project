import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import EditJobForm from "./EditJobForm";

const CreatedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const [formData, setFormData] = useState({
    position: "",
    description: "",
    advert: "",
    termsOfService: "",
    numberOfPosts: "",
    applicationDeadline: "",
    applicationInstructions: "",
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/jobs");
        if (!response.ok) throw new Error("Failed to fetch jobs");
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  const handleDelete = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      const response = await fetch(`http://127.0.0.1:5000/api/jobs/${jobId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete job");

      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
      alert("Job deleted successfully!");
    } catch (error) {
      console.error("Error deleting job:", error);
      alert("Failed to delete job. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleEditClick = (job) => {
    setEditingJob(job);
    setFormData({ ...job });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/jobs/${editingJob.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Failed to update job");

      const updatedJob = await response.json();
      setJobs((prevJobs) =>
        prevJobs.map((job) => (job.id === updatedJob.id ? updatedJob : job))
      );
      setEditingJob(null);
      setFormData({
        position: "",
        description: "",
        advert: "",
        termsOfService: "",
        numberOfPosts: "",
        applicationDeadline: "",
        applicationInstructions: "",
      });
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingJob(null);
    setFormData({
      position: "",
      description: "",
      advert: "",
      termsOfService: "",
      numberOfPosts: "",
      applicationDeadline: "",
      applicationInstructions: "",
    });
  };

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold text-gray-800 text-center mb-8">
        Job Listings
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="flex flex-col bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300"
          >
            {/* Card Header */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-t-lg p-4">
              <h4 className="text-lg font-bold truncate">{job.position}</h4>
              <p className="text-sm">
                <strong>Deadline:</strong>{" "}
                <span className="text-yellow-300">{job.applicationDeadline}</span>
              </p>
            </div>

            {/* Card Body */}
            <div className="p-6 flex-grow space-y-3">
              <p className="text-sm text-gray-600">
                <strong>Description:</strong> {job.description}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Advert:</strong> {job.advert}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Terms of Service:</strong> {job.termsOfService}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Application Instructions:</strong>{" "}
                {job.applicationInstructions}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Number of Posts:</strong> {job.numberOfPosts}
              </p>
            </div>

            {/* Card Footer */}
            <div className="flex justify-between items-center px-4 py-3 border-t border-gray-200 bg-gray-50 rounded-b-lg">
              <button
                onClick={() => handleEditClick(job)}
                className="text-blue-600 hover:text-blue-800 flex items-center space-x-2"
                aria-label="Edit Job"
              >
                <FaEdit size={16} />
                <span className="text-sm font-medium">Edit</span>
              </button>
              <button
                onClick={() => handleDelete(job.id)}
                className="text-red-600 hover:text-red-800 flex items-center space-x-2"
                aria-label="Delete Job"
              >
                <FaTrashAlt size={16} />
                <span className="text-sm font-medium">Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Editing Job */}
      {editingJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 sm:w-2/3 lg:w-1/2 p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              onClick={handleCancelEdit}
            >
              &#x2715;
            </button>
            <EditJobForm
              formData={formData}
              handleChange={handleChange}
              handleUpdate={handleUpdate}
              onCancel={handleCancelEdit}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatedJobs;
