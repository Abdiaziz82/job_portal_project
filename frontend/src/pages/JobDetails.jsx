import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/jobs/${id}`)
      .then((response) => response.json())
      .then((data) => setJob(data))
      .catch((error) => console.error("Error fetching job details:", error));
  }, [id]);

  if (!job) {
    return <p className="text-center text-gray-500 mt-12">Loading job details...</p>;
  }

  return (
    <div className="container mx-auto mt-12 px-4 md:px-8">
      <h2 className="text-3xl font-bold text-green-700 text-center mb-6">{job.position}</h2>

      <div className="text-lg text-gray-600 mb-4">{job.description}</div>

      <div className="text-sm text-gray-500 mb-6">
        <p><strong>Deadline:</strong> {new Date(job.applicationDeadline).toLocaleDateString()}</p>
      </div>

      <div className="text-center space-y-8">
        <button
          className="bg-green-700 text-white py-2 px-4 rounded-lg hover:bg-green-800 transition w-full md:w-auto"
          onClick={() => alert("Apply functionality to be implemented")}
        >
          Apply for this Job
        </button>

        <button
          className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition w-full md:w-auto mt-4"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default JobDetails;
