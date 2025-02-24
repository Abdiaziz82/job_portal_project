import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    fetch("/saved-jobs", {
      method: "GET",
      credentials: "include", // Ensure cookies/JWT are sent
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          setSavedJobs([]); // No saved jobs
        } else {
          setSavedJobs(data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching saved jobs:", error);
        setError("Failed to load saved jobs");
        setLoading(false);
        toast.error("Failed to load saved jobs. Please try again.");
      });
  }, []);

  const handleRemoveJob = (jobId) => {
    console.log("Attempting to remove job:", jobId); // Debugging log

    fetch("/remove-saved-job", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Ensure cookies are sent with the request
      body: JSON.stringify({ job_id: jobId }), // Ensure the key matches the backend expectation
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to remove job");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Job removed successfully:", data.message);
        setSavedJobs((prevJobs) => prevJobs.filter((job) => job.job_id !== jobId)); // Update the UI
        toast.success("Job removed successfully!");
      })
      .catch((error) => {
        console.error("Error removing job:", error.message);
        toast.error("Failed to remove job. Please try again.");
      });
  };

  if (loading)
    return (
      <div className="container mx-auto mt-12 px-4">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="container mx-auto mt-12 px-4">
        <p className="text-center text-red-500">{error}</p>
      </div>
    );

  return (
    <div className="container mx-auto mt-12 px-4">
      <h2 className="text-3xl font-bold text-green-700 text-center mb-8">My Saved Jobs</h2>

      {savedJobs.length === 0 ? (
        <div className="col-span-full flex flex-col items-center justify-center p-8 bg-white shadow-lg rounded-lg border border-gray-100">
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
          <h3 className="text-2xl font-bold text-gray-700 mb-2">No Saved Jobs</h3>
          <p className="text-gray-500 text-center mb-4">
            You have not saved any jobs yet. Start exploring and save jobs that interest you.
          </p>
          <button
            className="mt-4 bg-gradient-to-r from-green-600 to-green-700 text-white py-2 px-6 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300"
            onClick={() => navigate("/dashboard/browse-jobs")}
          >
            Browse Jobs
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300"
              style={{
                overflow: "hidden", // Prevent content from overflowing
                wordWrap: "break-word", // Break long words to prevent overflow
              }}
            >
              {/* Job Title */}
              <h3 className="text-xl font-semibold text-green-700 mb-3 break-words">
                {job.position}
              </h3>

              {/* Job Details */}
              <div className="text-sm text-gray-600 space-y-2">
                <p>
                  <strong className="text-gray-700">Advert:</strong>{" "}
                  <span className="break-words">{job.advert}</span>
                </p>
                <p>
                  <strong className="text-gray-700">Grade:</strong> {job.grade}
                </p>
                <p className="text-red-600 font-semibold">
                  Deadline: {new Date(job.applicationDeadline).toLocaleDateString()}
                </p>
              </div>

              {/* Buttons */}
              <div className="mt-4 space-y-3">
                {/* View More Details Button */}
                <button
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-2 px-4 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 flex items-center justify-center"
                  onClick={() => navigate(`/dashboard/browse-jobs/${job.job_id}`)} // Navigate to job details
                >
                  <span>View More Details</span>
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>

                {/* Remove Job Button */}
                <button
                  className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition"
                  onClick={() => handleRemoveJob(job.job_id)} // Use job.job_id instead of job.id
                >
                  Remove Job
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}