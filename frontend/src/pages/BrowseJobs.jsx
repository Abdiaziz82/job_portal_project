import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import JobDetails from "./JobDetails";

const BrowseJobs = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/jobs") // Adjust API URL if needed
      .then((response) => response.json())
      .then((data) => setJobs(data))
      .catch((error) => console.error("Error fetching jobs:", error));
  }, []);

  return (
    <div className="container mx-auto mt-12 px-4">
      <Routes>
        {/* Default Browse Jobs Page */}
        <Route
          index
          element={
            <>
              <h2 className="text-3xl font-bold text-green-700 text-center mb-8">
                Available Jobs
              </h2>
              <div className="flex flex-wrap justify-center gap-6">
                {jobs.length > 0 ? (
                  jobs.map((job) => (
                    <div
                      key={job.id}
                      className="bg-white shadow-md rounded-xl p-6 border border-gray-300 w-3/5 max-w-xl"
                    >
                      <h3 className="text-xl font-semibold text-green-700 mb-2">
                        {job.position}
                      </h3>
                      <div className="text-sm text-gray-500 space-y-1">
                        <p>
                          <strong className="text-gray-700">Advert:</strong> {job.advert}
                        </p>
                        <p>
                          <strong className="text-gray-700">Posts Available:</strong> {job.numberOfPosts}
                        </p>
                        <p>
                          <strong className="text-gray-700">Grade Required:</strong> {job.grade}
                        </p>
                        <p className="text-red-600 font-semibold">
                          Deadline: {new Date(job.applicationDeadline).toLocaleDateString()}
                        </p>
                      </div>
                      <button
                        className="mt-4 w-full bg-green-700 text-white py-2 px-4 rounded-lg hover:bg-green-800 transition"
                        onClick={() => navigate(`/dashboard/browse-jobs/${job.id}`)}
                      >
                        View More Details
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500">No jobs available at the moment.</p>
                )}
              </div>
            </>
          }
        />

        {/* Nested Route for Job Details */}
        <Route path=":id" element={<JobDetails />} />
      </Routes>
    </div>
  );
};

export default BrowseJobs;
