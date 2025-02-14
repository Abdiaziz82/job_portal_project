import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const MoreJobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/jobs/${id}`)
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            throw new Error(err.message || "Failed to fetch job details");
          });
        }
        return response.json();
      })
      .then((data) => {
        if (!data || Object.keys(data).length === 0) {
          throw new Error("Job not found");
        }
        setJob(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center mt-8">Loading job details...</div>;
  if (error)
    return (
      <div className="text-center text-red-600 mt-8">
        <p>{error}</p>
        <button
          className="mt-4 bg-gradient-to-r from-green-600 to-green-700 text-white py-2 px-4 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );

  return (
    <div className="container mx-auto mt-12 px-4">
      <h2 className="text-3xl font-bold text-green-700 text-center mb-8">Job Details</h2>

      <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100 flex flex-col p-6">
        <h3 className="text-2xl font-bold text-green-700 mb-4">{job.position}</h3>

        <div className="text-sm text-gray-600 space-y-4">
          <p>
            <strong className="text-gray-700">Advert:</strong> {job.advert}
          </p>
          <p>
            <strong className="text-gray-700">Terms of Service:</strong> {job.termsOfService}
          </p>
          <p>
            <strong className="text-gray-700">Number of Posts:</strong> {job.numberOfPosts}
          </p>
          <p className="text-red-600 font-semibold">
            <strong>Deadline:</strong> {new Date(job.applicationDeadline).toLocaleDateString()}
          </p>
          <p>
            <strong className="text-gray-700">Grade:</strong> {job.grade}
          </p>
          <p>
            <strong className="text-gray-700">Requirements:</strong> {job.requirements}
          </p>
          <p>
            <strong className="text-gray-700">Duties:</strong> {job.duties}
          </p>
          <p>
            <strong className="text-gray-700">Created At:</strong> {new Date(job.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="mt-6 flex gap-4">
          <button
            className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-2 px-4 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoreJobDetails;
