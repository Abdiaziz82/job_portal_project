import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaRegCheckCircle } from "react-icons/fa";
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

      <h2 className="text-3xl font-bold text-green-700 text-center">
        {position} ({numberOfPosts} posts)
      </h2>
      <p className="text-lg text-gray-600 text-center mt-2">
        <span className="font-semibold text-black">Application Deadline:</span> {applicationDeadline}
      </p>

      <div className="bg-white p-8 rounded-lg shadow-lg mb-8 w-full relative pt-14">
        {/* Apply Now Button */}
        <button
          className={`py-2 px-4 rounded-lg transition absolute top-4 right-4 flex items-center space-x-2 ${
            hasApplied || loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-700 hover:bg-green-800"
          } text-white`}
          onClick={confirmApplication}
          disabled={hasApplied || loading}
        >
          <FaRegCheckCircle className="text-white" />
          <span>{loading ? "Applying..." : hasApplied ? "Already Applied" : "Apply Now for this Job"}</span>
        </button>

        <div className="text-lg text-gray-600 mb-6">
          <h3 className="text-xl font-semibold text-green-700 mb-2">Job Description:</h3>
          <div className="text-lg text-black leading-relaxed w-full text-justify break-words">{description}</div>
        </div>

        {requirements && (
          <div className="text-lg text-gray-600 mb-6">
            <h3 className="text-xl font-semibold text-green-700 mb-2">Requirements:</h3>
            <div className="text-black whitespace-pre-line leading-relaxed">{requirements}</div>
          </div>
        )}

        {duties && (
          <div className="text-lg text-gray-600">
            <h3 className="text-xl font-semibold text-green-700 mb-2">Duties:</h3>
            <div className="text-black whitespace-pre-line leading-relaxed">{duties}</div>
          </div>
        )}
      </div>

      <div className="flex justify-center gap-6 mb-12 w-full">
        <button
          className={`py-2 px-5 rounded-lg transition w-full md:w-auto shadow-md hover:shadow-lg focus:outline-none ${
            hasApplied || loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-700 hover:bg-green-800 text-white"
          }`}
          onClick={confirmApplication}
          disabled={hasApplied || loading}
        >
          <i className="fa fa-paper-plane mr-2"></i>{" "}
          {loading ? "Applying..." : hasApplied ? "Already Applied" : "Apply for this Job"}
        </button>

        <button
          className="bg-gray-500 text-white py-2 px-5 rounded-lg hover:bg-gray-600 transition w-full md:w-auto shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default JobDetails;
