import { FaSuitcase, FaRegPaperPlane, FaBell } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Dashboard Title */}
      <h1 className="text-4xl font-extrabold text-gray-800 mb-10 text-center">University Job Portal Dashboard</h1>

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* Jobs Applied Card */}
        <div className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 flex items-center justify-between space-x-6">
          <div className="bg-green-600 p-5 rounded-full text-white">
            <FaRegPaperPlane className="text-3xl" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Jobs Applied</h2>
            <p className="text-3xl font-bold text-green-700">12</p>
          </div>
        </div>

        {/* Jobs Open Card */}
        <div className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 flex items-center justify-between space-x-6">
          <div className="bg-blue-600 p-5 rounded-full text-white">
            <FaSuitcase className="text-3xl" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Jobs Open</h2>
            <p className="text-3xl font-bold text-blue-700">5</p>
          </div>
        </div>

        {/* Saved Jobs Card */}
        <div className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 flex items-center justify-between space-x-6">
          <div className="bg-yellow-500 p-5 rounded-full text-white">
            <FaBell className="text-3xl" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Saved Jobs</h2>
            <p className="text-3xl font-bold text-yellow-600">3</p>
          </div>
        </div>
      </div>

      {/* New Job Alerts Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">New Job Alerts</h2>
        <div className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <ul className="space-y-6">
            <li className="flex justify-between text-gray-700">
              <span className="text-lg font-semibold">Software Engineer at University Research Center</span>
              <span className="text-sm text-gray-500">Posted 1 hour ago</span>
            </li>
            <li className="flex justify-between text-gray-700">
              <span className="text-lg font-semibold">Research Assistant Application Open for Environmental Studies</span>
              <span className="text-sm text-gray-500">Posted 2 hours ago</span>
            </li>
            <li className="flex justify-between text-gray-700">
              <span className="text-lg font-semibold">Teaching Assistant Role in Computer Science Department</span>
              <span className="text-sm text-gray-500">Posted 4 hours ago</span>
            </li>
            <li className="flex justify-between text-gray-700">
              <span className="text-lg font-semibold">Internship Program in University Library</span>
              <span className="text-sm text-gray-500">Posted 6 hours ago</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
