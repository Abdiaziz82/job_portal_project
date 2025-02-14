import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import JobDetails from "./JobDetails";

const BrowseJobs = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/jobs")
      .then((response) => response.json())
      .then((data) => setJobs(data))
      .catch((error) => console.error("Error fetching jobs:", error));
  }, []);

  const handleSaveJob = (jobId) => {
    fetch("http://127.0.0.1:5000/save-job", {
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
          alert(data.message);
        }
      })
      .catch((error) => console.error("Error saving job:", error));
  };

  return (
    <div className="container mx-auto mt-12 px-4">
      <Routes>
        <Route
          index
          element={
            <>
              <h2 className="text-3xl font-bold text-green-700 text-center mb-8">
                Available Jobs
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.length > 0 ? (
                  jobs.map((job) => (
                    <div
                      key={job.id}
                      className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 flex flex-col"
                    >
                      <div className="p-5 flex-1">
                        <h3 className="text-xl font-bold text-green-700 mb-3">
                          {job.position}
                        </h3>

                        <div className="text-sm text-gray-600 space-y-2">
                          <p>
                            <strong className="text-gray-700">Advert:</strong>{" "}
                            {job.advert}
                          </p>
                          <p>
                            <strong className="text-gray-700">Posts Available:</strong>{" "}
                            {job.numberOfPosts}
                          </p>
                          <p>
                            <strong className="text-gray-700">Grade:</strong>{" "}
                            {job.grade}
                          </p>
                          <p className="text-red-600 font-semibold">
                            Deadline:{" "}
                            {new Date(job.applicationDeadline).toLocaleDateString()}
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
                  <p className="text-center text-gray-500 col-span-full">
                    No jobs available at the moment.
                  </p>
                )}
              </div>
            </>
          }
        />
        <Route path=":id" element={<JobDetails />} />
      </Routes>
    </div>
  );
};

export default BrowseJobs;