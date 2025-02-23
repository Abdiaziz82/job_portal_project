import { FaSuitcase, FaRegPaperPlane, FaBell, FaCheckCircle } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [jobCount, setJobCount] = useState(0);
  const [openJobs, setOpenJobs] = useState(0);
  const [jobs, setJobs] = useState([]);
  const [savedJobsCount, setSavedJobsCount] = useState(0);
  const [acceptedApplications, setAcceptedApplications] = useState(0);

  // Fetch job applications
  useEffect(() => {
    const fetchJobApplications = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/user/job-applications", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch job applications");
        }

        const data = await response.json();
        setJobCount(data.length);
      } catch (error) {
        console.error("Error fetching job applications:", error);
      }
    };

    fetchJobApplications();
  }, []);

  // Fetch accepted applications
  useEffect(() => {
    const fetchAcceptedApplications = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/user/job-applications?status=accepted", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch accepted applications");
        }

        const data = await response.json();
        setAcceptedApplications(data.length); // Set the number of accepted applications
      } catch (error) {
        console.error("Error fetching accepted applications:", error);
      }
    };

    fetchAcceptedApplications();
  }, []);

  // Fetch open jobs
  useEffect(() => {
    const fetchOpenJobs = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/jobs", {
          method: "GET",
          credentials: "include",
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch open jobs");
        }
  
        const data = await response.json();
        setOpenJobs(data.jobs.length); // Correctly access the jobs array length
      } catch (error) {
        console.error("Error fetching open jobs:", error);
      }
    };
  
    fetchOpenJobs();
  }, []);
  

  // Fetch all jobs for the job alerts section
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/jobs", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }

        const data = await response.json();
        setJobs(data.jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  // Fetch saved jobs
  useEffect(() => {
    fetch("http://127.0.0.1:5000/saved-jobs", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          setSavedJobsCount(0);
        } else {
          setSavedJobsCount(data.length);
        }
      })
      .catch((error) => {
        console.error("Error fetching saved jobs:", error);
        setSavedJobsCount(0);
      });
  }, []);



  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen font">
      {/* Dashboard Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Job Portal Dashboard</h1>

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
         {/* Jobs Open Card */}
      <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <FaSuitcase className="text-2xl text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-600">Jobs Open</h2>
              <p className="text-2xl font-bold text-gray-800">{openJobs}</p>
            </div>
          </div>
        </div>

        {/* Jobs Applied Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-center space-x-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <FaRegPaperPlane className="text-2xl text-green-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-600">Jobs Applied</h2>
              <p className="text-2xl font-bold text-gray-800">{jobCount}</p>
            </div>
          </div>
        </div>

        
      
        {/* Saved Jobs Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-center space-x-4">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <FaBell className="text-2xl text-yellow-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-600">Saved Jobs</h2>
              <p className="text-2xl font-bold text-gray-800">{savedJobsCount}</p>
            </div>
          </div>
        </div>

        {/* Accepted Applications Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-center space-x-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <FaCheckCircle className="text-2xl text-purple-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-600">Accepted Applications</h2>
              <p className="text-2xl font-bold text-gray-800">{acceptedApplications}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Job Alerts Section */}
      <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm">
  <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">Recent Job Alerts</h2>
  <div className="space-y-4">
    {jobs.length > 0 ? (
      jobs.map((job) => (
        <div
          key={job.id}
          className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 rounded-lg hover:bg-gray-50 transition-all duration-200 border border-gray-100"
        >
          <div className="flex-1">
            <h3 className="text-base md:text-lg font-semibold text-gray-700 break-words whitespace-normal">
              {job.position} - GaU GRADE {job.grade}
            </h3>
            <p className="text-sm text-gray-500 break-words whitespace-normal">
              ADVERT NO: {job.advert}
            </p>
          </div>
          <span className="text-sm text-gray-500 mt-2 md:mt-0 md:ml-4 break-words whitespace-normal">
  <Link 
    to={`/dashboard/browse-jobs/${job.id}`} 
    className="text-green-600 hover:underline font-medium"
  >
    Apply Now
  </Link>
</span>
        </div>
      ))
    ) : (
      <p className="text-gray-500">No jobs available at the moment.</p>
    )}
  </div>
</div>
    </div>
  );
};

export default Dashboard;