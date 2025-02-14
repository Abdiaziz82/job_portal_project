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
                      className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300"
                    >
                      <h3 className="text-xl font-semibold text-green-700 mb-3">
                        {job.position}
                      </h3>

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

                      <button
                        className="mt-4 w-full bg-green-700 text-white py-2 px-4 rounded-lg hover:bg-green-800 transition"
                        onClick={() => navigate(`/dashboard/browse-jobs/${job.id}`)}
                      >
                        View More Details
                      </button>

                      {/* Save Job Button */}
                      <button
                        className="mt-2 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                        onClick={() => handleSaveJob(job.id)}
                      >
                        Save Job
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
        <Route path=":id" element={<JobDetails />} />
      </Routes>
    </div>
  );
};

export default BrowseJobs;
