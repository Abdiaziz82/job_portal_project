import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

  if (loading) return <div className="text-center mt-8">Loading jobs...</div>;
  if (error) return <div className="text-center text-red-600 mt-8">{error}</div>;

  return (
    <div className="container mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold text-green-700 text-center mb-8">Open Jobs</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 flex flex-col p-5"
            >
              <h3 className="text-xl font-bold text-green-700 mb-3">{job.position}</h3>

              <div className="text-sm text-gray-600 space-y-2">
                <p>
                  <strong className="text-gray-700">Advert:</strong> {job.advert}
                </p>
                <p>
                  <strong className="text-gray-700">Terms of Service:</strong> {job.termsOfService}
                </p>
                <p>
                  <strong className="text-gray-700">Grade:</strong> {job.grade}
                </p>
              </div>

              <button
                className="mt-4 w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-2 px-4 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 flex items-center justify-center"
                onClick={() => navigate(`/jobs/${job.id}`)}
              >
                <span>View More</span>
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No jobs available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default OpenJobs;
