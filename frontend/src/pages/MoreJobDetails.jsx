import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaRegCheckCircle, FaArrowLeft } from "react-icons/fa";

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

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen font">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-700"></div>
      </div>
    );

  if (error)
    return (
      <div className="text-center mt-12">
        <p className="text-red-600 text-lg font-semibold">{error}</p>
        <button
          className="mt-4 bg-green-700 text-white py-2 px-6 rounded-lg hover:bg-green-800 transition-all flex items-center justify-center mx-auto"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft className="mr-2" /> Go Back
        </button>
      </div>
    );

  // Function to handle Apply Job Now button click
  const handleApplyNow = () => {
    navigate("/login"); // Redirect to the login page
  };

  return (
    <div className="container mx-auto mt-12 px-4 md:px-8 w-full max-w-7xl pb-12 font">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-green-700 mb-2">{job.position}</h1>
        <p className="text-lg text-gray-600">
          <span className="font-semibold text-gray-800">Number of Posts:</span> {job.numberOfPosts}
        </p>
        <p className="text-lg text-gray-600">
          <span className="font-semibold text-gray-800">Grade:</span> {job.grade}
        </p>
        <p className="text-lg text-gray-600">
          <span className="font-semibold text-gray-800">Deadline:</span>{" "}
          {new Date(job.applicationDeadline).toLocaleDateString()}
        </p>
      </div>

      {/* Action Buttons at the Top */}
      <div className="flex justify-end gap-4 mb-8">
        <button
          className="py-3 px-8 rounded-lg shadow-md bg-gray-600 hover:bg-gray-700 text-white transition-all flex items-center space-x-2"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft className="text-lg" />
          <span>Go Back</span>
        </button>
        <button
          className={`py-3 px-8 rounded-lg shadow-md transition-all flex items-center space-x-2 ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-700 hover:bg-green-800"
          } text-white`}
          onClick={handleApplyNow} // Use the handleApplyNow function
          disabled={loading}
        >
          <FaRegCheckCircle className="text-lg" />
          <span>{loading ? "Applying..." : "Apply Job Now"}</span>
        </button>
      </div>

      {/* Job Details Card */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 w-full">
        {/* Job Description */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-green-700 mb-4">Job Description</h2>
          <p className="text-gray-700 leading-relaxed text-justify">{job.advert}</p>
        </div>

        {/* Requirements Section */}
        {job.requirements && (
          <div className="mb-8">
            <h2 className="text-2xl font text-green-700 mb-4">Requirements</h2>
            <p className="text-gray-700 whitespace-pre-line leading-relaxed font">{job.requirements}</p>
          </div>
        )}

        {/* Duties Section */}
        {job.duties && (
          <div className="mb-8 font">
            <h2 className="text-2xl font-bold text-green-700 mb-4">Duties</h2>
            <p className="text-gray-700 whitespace-pre-line leading-relaxed">{job.duties}</p>
          </div>
        )}

        {/* Posted On Section */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-green-700 mb-2">Posted On</h3>
          <p className="text-gray-700">{new Date(job.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default MoreJobDetails;