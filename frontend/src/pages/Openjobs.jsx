import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBriefcase, FaArrowRight } from "react-icons/fa";

const OpenJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/jobs")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }
        return response.json();
      })
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-600 mt-8">
        <p>Error: {error}</p>
        <p>Please try again later.</p>
      </div>
    );

  return (
    <div className="container mx-auto px-4 pt-12 pb-20 font">
      {/* Page Title with Icon */}
      <div className="flex items-center justify-center mb-12">
        <FaBriefcase className="text-4xl text-green-600 mr-3" />
        <h2 className="text-4xl font-bold text-green-700">Open Jobs</h2>
      </div>

      {/* Job Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 flex flex-col"
            >
              {/* Job Details */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-green-700 mb-4">
                  {job.position}({job.numberOfPosts} positions)
                </h3>

                <div className="text-sm text-gray-600 space-y-3">
                  <div>
                    <strong className="text-gray-700">Advert:</strong>{" "}
                    <span className="text-gray-800">{job.advert}</span>
                  </div>
                  <div>
                    <strong className="text-gray-700">Terms of Service:</strong>{" "}
                    <span className="text-gray-800">{job.termsOfService}</span>
                  </div>
                  <div>
                    <strong className="text-gray-700">Grade:</strong>{" "}
                    <span className="text-gray-800">{job.grade}</span>
                  </div>
                </div>
              </div>

              {/* View More Button */}
              <div className="p-6 bg-gray-50 border-t border-gray-100">
                <button
                  className="w-full bg-gradient-to-r from-green-700 to-green-800 text-white py-3 px-6 rounded-lg hover:from-green-800 hover:to-green-900 transition-all duration-300 flex items-center justify-center"
                  onClick={() => navigate(`/open-jobs/${job.id}`)}
                >
                  <span>View More</span>
                  <FaArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No jobs available at the moment.
          </p>
        )}
      </div>
    </div>
  );
};

export default OpenJobs;