import React, { useEffect, useState } from "react";

export default function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/saved-jobs", {
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
      });
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading saved jobs...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto mt-12 px-4">
      <h2 className="text-3xl font-bold text-green-700 text-center mb-8">My Saved Jobs</h2>

      {savedJobs.length === 0 ? (
        <p className="text-center text-gray-500">You have not saved any jobs yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300"
            >
              {/* Job Title */}
              <h3 className="text-xl font-semibold text-green-700 mb-3">{job.position}</h3>

              {/* Job Details */}
              <div className="text-sm text-gray-600 space-y-2">
                <p>
                  <strong className="text-gray-700">Advert:</strong> {job.advert}
                </p>
                <p>
                  <strong className="text-gray-700">Grade:</strong> {job.grade}
                </p>
                <p className="text-red-600 font-semibold">
                  Deadline: {new Date(job.applicationDeadline).toLocaleDateString()}
                </p>
              </div>

              {/* Remove Saved Job (Optional) */}
              <button
                className="mt-4 w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition"
                onClick={() => console.log("Remove job", job.id)} // Implement removal later
              >
                Remove Job
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
