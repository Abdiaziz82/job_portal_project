import { FaSuitcase, FaRegPaperPlane, FaBell } from "react-icons/fa";
import { useState,useEffect } from "react";

const Dashboard = () => {

  const [jobCount, setJobCount] = useState(0);
  const [openJobs, setOpenJobs] = useState(0);
  const [jobs, setJobs] = useState([]);
  const [savedJobsCount, setSavedJobsCount] = useState(0);

  useEffect(() => {
    const fetchJobApplications = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/user/job-applications", {
          method: "GET",
          credentials: "include", // Ensures cookies (JWT) are sent
        });

        if (!response.ok) {
          throw new Error("Failed to fetch job applications");
        }

        const data = await response.json();
        setJobCount(data.length); // Count the number of applied jobs
      } catch (error) {
        console.error("Error fetching job applications:", error);
      }
    };

    fetchJobApplications();
  }, []);

  useEffect(() => {
    const fetchOpenJobs = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/jobs", {
          method: "GET",
          credentials: "include", // Ensures cookies (if needed) are sent
        });

        if (!response.ok) {
          throw new Error("Failed to fetch open jobs");
        }

        const data = await response.json();
        setOpenJobs(data.length); // Count the total number of jobs
      } catch (error) {
        console.error("Error fetching open jobs:", error);
      }
    };

    fetchOpenJobs();
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/jobs", {
          method: "GET",
          credentials: "include", // Ensure cookies are sent if required
        });

        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }

        const data = await response.json();
        setJobs(data); // Store jobs in state
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  // Function to calculate time difference
  const timeSincePosted = (createdAt) => {
    const createdDate = new Date(createdAt);
    const now = new Date();
    const diffInSeconds = Math.floor((now - createdDate) / 1000);

    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    }
    if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    }
    if (diffInSeconds < 86400) {
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    }
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  useEffect(() => {
    fetch("http://127.0.0.1:5000/saved-jobs", {
      method: "GET",
      credentials: "include", // Ensure authentication cookies/JWT are sent
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          setSavedJobsCount(0); // No saved jobs
        } else {
          setSavedJobsCount(data.length); // Set the number of saved jobs
        }
      })
      .catch((error) => {
        console.error("Error fetching saved jobs:", error);
        setSavedJobsCount(0);
      });
  }, []);


  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Dashboard Title */}
      <h1 className="text-4xl font-extrabold text-gray-800 mb-10 text-center">Your Job Portal Dashboard</h1>

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* Jobs Applied Card */}
        <div className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 flex items-center justify-between space-x-6">
      <div className="bg-green-600 p-5 rounded-full text-white">
        <FaRegPaperPlane className="text-3xl" />
      </div>
      <div>
        <h2 className="text-xl font-semibold text-gray-700">Jobs Applied</h2>
        <p className="text-3xl font-bold text-green-700">{jobCount}</p>
      </div>
    </div>

        {/* Jobs Open Card */}
        <div className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 flex items-center justify-between space-x-6">
      <div className="bg-blue-600 p-5 rounded-full text-white">
        <FaSuitcase className="text-3xl" />
      </div>
      <div>
        <h2 className="text-xl font-semibold text-gray-700">Jobs Open</h2>
        <p className="text-3xl font-bold text-blue-700">{openJobs}</p>
      </div>
    </div>

        {/* Saved Jobs Card */}
        <div className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 flex items-center justify-between space-x-6">
      <div className="bg-yellow-500 p-5 rounded-full text-white">
        <FaBell className="text-3xl" />
      </div>
      <div>
        <h2 className="text-xl font-semibold text-gray-700">Saved Jobs</h2>
        <p className="text-3xl font-bold text-yellow-600">{savedJobsCount}</p>
      </div>
    </div>
      </div>

      {/*  Job Alerts Section */}
      <div className="mt-16">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">New Job Alerts</h2>
      <div className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
        {jobs.length > 0 ? (
          <ul className="space-y-6">
            {jobs.map((job) => (
              <li key={job.id} className="flex justify-between text-gray-700">
                <span className="text-lg font-semibold">
                  ADVERT NO: {job.advert}: {job.position} - GaU GRADE {job.grade}
                </span>
                <span className="text-sm text-gray-500">
                  {timeSincePosted(job.createdAt)}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No jobs available at the moment.</p>
        )}
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
