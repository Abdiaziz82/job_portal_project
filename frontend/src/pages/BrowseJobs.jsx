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

              {/* Job Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.length > 0 ? (
                  jobs.map((job) => (
                    <div
                      key={job.id}
                      className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300"
                    >
                      {/* Job Title */}
                      <h3 className="text-xl font-semibold text-green-700 mb-3">
                        {job.position}
                      </h3>

                      {/* Job Info */}
                      <div className="text-sm text-gray-600 space-y-2">
                        <p>
                          <strong className="text-gray-700">Advert:</strong> {job.advert}
                        </p>
                        <p>
                          <strong className="text-gray-700">Posts Available:</strong> {job.numberOfPosts}
                        </p>
                        <p>
                          <strong className="text-gray-700">Grade:</strong> {job.grade}
                        </p>
                        <p className="text-red-600 font-semibold">
                          Deadline: {new Date(job.applicationDeadline).toLocaleDateString()}
                        </p>
                      </div>

                      {/* View More Button */}
                      <button
                        className="mt-4 w-full bg-green-700 text-white py-2 px-4 rounded-lg hover:bg-green-800 transition"
                        onClick={() => navigate(`/dashboard/browse-jobs/${job.id}`)}
                      >
                        View More Details
                      </button>
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

        {/* Nested Route for Job Details */}
        <Route path=":id" element={<JobDetails />} />
      </Routes>
    </div>
  );
};

export default BrowseJobs;
