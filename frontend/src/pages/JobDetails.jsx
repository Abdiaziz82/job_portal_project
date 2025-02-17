import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaRegCheckCircle, FaCalendarAlt, FaTasks, FaListAlt, FaArrowLeft } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/jobs/${id}`, { credentials: "include" })
      .then((response) => response.json())
      .then((data) => setJob(data))
      .catch(() => toast.error("Error fetching job details"));
  }, [id]);

  const applyForJob = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:5000/apply-job/${id}`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Failed to apply for the job");
        return;
      }

      toast.success("✅ Application submitted successfully!");
      setHasApplied(true);
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const confirmApplication = () => {
    toast.info(
      <div className="w-full flex flex-col items-center">
        <p className="font-medium text-gray-800 text-center">
          Before submitting your application, ensure your profile is fully updated.
        </p>
        <div className="flex justify-center gap-4 mt-3">
          <button
            className="bg-green-700 text-white py-1 px-4 rounded-md hover:bg-green-800 transition"
            onClick={() => {
              toast.dismiss();
              applyForJob();
            }}
          >
            Apply Now
          </button>
          <button
            className="bg-gray-500 text-white py-1 px-4 rounded-md hover:bg-gray-600 transition"
            onClick={() => {
              toast.dismiss();
              navigate("/dashboard/profile");
            }}
          >
            Go to Profile
          </button>
        </div>
      </div>,
      { position: "top-center", autoClose: false, closeOnClick: false }
    );
  };

  if (!job) {
    return <p className="text-center text-gray-500 mt-12">Loading job details...</p>;
  }

  const { position, description, requirements, duties, applicationDeadline, numberOfPosts } = job;

  return (
    <div className="container mx-auto mt-12 px-4 md:px-8">
      {/* Toast Notifications */}
      <ToastContainer position="top-center" />

      {/* Job Title and Deadline */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-2">
          {position} ({numberOfPosts} posts)
        </h2>
        <p className="text-base md:text-lg text-gray-600 flex flex-col md:flex-row items-center justify-center">
          <span className="flex items-center mr-2">
            <FaCalendarAlt className="mr-2" />
            <span className="font-semibold text-black">Application Deadline:</span>
          </span>
          <span>{applicationDeadline}</span>
        </p>
      </div>

      {/* Job Details Card */}
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-8 relative">
        {/* Apply Now Button - Top Right */}
        <button
          className={`absolute top-4 right-4 py-2 px-4 md:py-3 md:px-6 rounded-lg transition flex items-center space-x-2 ${
            hasApplied || loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-700 hover:bg-green-800"
          } text-white font-semibold text-sm md:text-base`}
          onClick={confirmApplication}
          disabled={hasApplied || loading}
        >
          <FaRegCheckCircle className="text-white" />
          <span>{loading ? "Applying..." : hasApplied ? "Already Applied" : "Apply Now for this Job"}</span>
        </button>

        {/* Job Description */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-green-700 mb-3 flex items-center">
            <FaTasks className="mr-2" />
            Job Description
          </h3>
          <p className="text-gray-700 leading-relaxed text-sm md:text-base">{description}</p>
        </div>

        {/* Requirements */}
        {requirements && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-green-700 mb-3 flex items-center">
              <FaListAlt className="mr-2" />
              Requirements
            </h3>
            <p className="text-gray-700 whitespace-pre-line leading-relaxed text-sm md:text-base">{requirements}</p>
          </div>
        )}

        {/* Duties */}
        {duties && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-green-700 mb-3 flex items-center">
              <FaListAlt className="mr-2" />
              Duties
            </h3>
            <p className="text-gray-700 whitespace-pre-line leading-relaxed text-sm md:text-base">{duties}</p>
          </div>
        )}
      </div>

      {/* Bottom Buttons */}
      <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6 mb-12">
        <button
          className={`py-2 px-4 md:py-3 md:px-6 rounded-lg transition flex items-center justify-center space-x-2 ${
            hasApplied || loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-700 hover:bg-green-800"
          } text-white font-semibold text-sm md:text-base`}
          onClick={confirmApplication}
          disabled={hasApplied || loading}
        >
          <FaRegCheckCircle className="text-white" />
          <span>{loading ? "Applying..." : hasApplied ? "Already Applied" : "Apply for this Job"}</span>
        </button>

        <button
          className="bg-gray-500 text-white py-2 px-4 md:py-3 md:px-6 rounded-lg hover:bg-gray-600 transition flex items-center justify-center space-x-2 font-semibold text-sm md:text-base"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft className="text-white" />
          <span>Go Back</span>
        </button>
      </div>
    </div>
  );
};

export default JobDetails;