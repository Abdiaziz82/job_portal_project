import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Education() {
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
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Educational Background</h1>

      {/* Form */}
      <form className="bg-white p-8 rounded-lg shadow-md space-y-10">
        {/* High School Section */}
        <div>
          <h2 className="text-2xl font-semibold text-green-700 mb-4">High School Education</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                School Name
              </label>
              <input
                type="text"
                placeholder="Enter high school name"
                className="w-full p-3 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Year Completed
              </label>
              <input
                type="number"
                placeholder="Enter year of graduation"
                className="w-full p-3 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Grade/Class
              </label>
              <input
                type="text"
                placeholder="Enter grade or classification (e.g., A, B)"
                className="w-full p-3 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Extracurricular Activities
              </label>
              <textarea
                placeholder="Enter activities or clubs participated in"
                className="w-full p-3 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                rows="3"
              ></textarea>
            </div>
          </div>
        </div>

        {/* University Section */}
        <div>
          <h2 className="text-2xl font-semibold text-green-700 mb-4">University Education</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                University Name
              </label>
              <input
                type="text"
                placeholder="Enter university name"
                className="w-full p-3 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Degree/Program
              </label>
              <input
                type="text"
                placeholder="Enter degree or program (e.g., BSc, MSc, PhD)"
                className="w-full p-3 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Field of Study
              </label>
              <input
                type="text"
                placeholder="Enter field of study (e.g., Computer Science)"
                className="w-full p-3 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Grade/Class
              </label>
              <input
                type="text"
                placeholder="Enter grade or classification (e.g., First Class)"
                className="w-full p-3 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Start Date
              </label>
              <input
                type="date"
                className="w-full p-3 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                End Date
              </label>
              <input
                type="date"
                className="w-full p-3 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Upload Certificates/Transcripts
          </label>
          <input
            type="file"
            multiple
            className="block w-full text-gray-700 border p-2 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
          />
          <small className="text-gray-500">
            Upload files in PDF, JPEG, or PNG format.
          </small>
        </div>

        {/* Save Button */}
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
