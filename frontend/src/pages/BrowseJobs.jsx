import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import JobDetails from "./JobDetails";

const BrowseJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Optional: For loading state
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/jobs")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Jobs:", data.jobs); // Log the fetched jobs
        setJobs(data.jobs); // Use data.jobs instead of data
        setIsLoading(false); // Optional: Set loading to false after fetching
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
        setIsLoading(false); // Optional: Set loading to false on error
      });
  }, []);

  const handleSaveJob = (jobId) => {
    fetch("/save-job", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ job_id: jobId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          toast.success(data.message); // Display success toast
        }
      })
      .catch((error) => {
        console.error("Error saving job:", error);
        toast.error("Failed to save job. Please try again."); // Display error toast
      });
  };

  return (
    <div className="container mx-auto mt-12 px-4 pb-20">
      <Routes>
        <Route
          index
          element={
            <>
              <h2 className="text-3xl font-bold text-green-700 text-center mb-8">
                Available Jobs
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
                {isLoading ? ( // Optional: Show loading state
                  <div className="col-span-full flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
                  </div>
                ) : jobs.length > 0 ? (
                  jobs.map((job) => (
                    <div
                      key={job.id}
                      className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 flex flex-col"
                      style={{
                        overflow: "hidden",
                        wordWrap: "break-word",
                      }}
                    >
                      <div className="p-5 flex-1">
                        <h3 className="text-xl font-bold text-green-700 mb-3 break-words">
                          {job.position}
                        </h3>

                        <div className="text-sm text-gray-600 space-y-2">
                          <p>
                            <strong className="text-gray-700">Advert:</strong>{" "}
                            <span className="break-words">{job.advert}</span>
                          </p>
                          <p>
                            <strong className="text-gray-700">Posts Available:</strong>{" "}
                            {job.number_of_posts} {/* Updated to number_of_posts */}
                          </p>
                          <p>
                            <strong className="text-gray-700">Grade:</strong>{" "}
                            {job.grade}
                          </p>
                          <p className="text-red-600 font-semibold">
                            Deadline:{" "}
                            {new Date(job.application_deadline).toLocaleDateString()} {/* Updated to application_deadline */}
                          </p>
                        </div>
                      </div>

                      <div className="p-5 bg-gray-50 border-t border-gray-100">
                        <div className="space-y-3">
                          <button
                            className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-2 px-4 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 flex items-center justify-center"
                            onClick={() => navigate(`/dashboard/browse-jobs/${job.id}`)}
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

                          <button
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center"
                            onClick={() => handleSaveJob(job.id)}
                          >
                            <span>Save Job</span>
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
                                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
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
                    <h3 className="text-2xl font-bold text-gray-700 mb-2">
                      No Jobs Available
                    </h3>
                    <p className="text-gray-500 text-center mb-4">
                      There are currently no job openings. Please check back later or explore other opportunities.
                    </p>
                    <button
                      className="mt-4 bg-gradient-to-r from-green-600 to-green-700 text-white py-2 px-6 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300"
                      onClick={() => navigate("/dashboard")}
                    >
                      Go to Dashboard
                    </button>
                  </div>
                )}
              </div>
            </>
          }
        />
        <Route path=":id" element={<JobDetails />} />
      </Routes>

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
};

export default BrowseJobs;