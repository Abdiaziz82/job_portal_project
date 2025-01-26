import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function WorkExperience() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen p-6 bg-gray-50">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-green-700 hover:text-green-800 transition mb-6"
      >
        <FaArrowLeft className="mr-2" />
        Back
      </button>

      {/* Form Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Work Experience</h1>

      {/* Form */}
      <form className="bg-white p-8 rounded-lg shadow-md space-y-6">
        {/* Job Title & Company Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Job Title</label>
            <input
              type="text"
              placeholder="Enter your job title"
              className="w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Company Name</label>
            <input
              type="text"
              placeholder="Enter the company's name"
              className="w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Start Date & End Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Start Date</label>
            <input
              type="date"
              className="w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">End Date</label>
            <input
              type="date"
              className="w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Responsibilities */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Responsibilities</label>
          <textarea
            placeholder="Briefly describe your responsibilities"
            rows="4"
            className="w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>

        {/* Achievements */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Key Achievements</label>
          <textarea
            placeholder="Highlight key achievements in this role"
            rows="4"
            className="w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>

        {/* Skills Acquired */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Skills Acquired</label>
          <input
            type="text"
            placeholder="List skills acquired in this role"
            className="w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-green-700 text-white font-medium rounded-md hover:bg-green-800 transition"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
