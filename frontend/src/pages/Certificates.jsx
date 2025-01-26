import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Certificate() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen p-6 bg-gray-50">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-green-700 hover:text-blue-800 transition mb-6"
      >
        <FaArrowLeft className="mr-2" />
        Back
      </button>

      {/* Form Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Certificates & Awards</h1>

      {/* Form */}
      <form className="bg-white p-8 rounded-lg shadow-md space-y-6">
        {/* Certificate Type & Specialization */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Certificate Type
            </label>
            <select
              className="w-full p-3 border rounded-md shadow-sm focus:ring-green-600 focus:border-green-500"
            >
              <option value="">Select certificate type</option>
              <option value="kcse">KCSE</option>
              <option value="diploma">Diploma</option>
              <option value="degree">Degree</option>
              <option value="masters">Master's (MSc/MA)</option>
              <option value="phd">PhD</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Program Specialization
            </label>
            <input
              type="text"
              placeholder="Enter your specialization (e.g., Computer Science)"
              className="w-full p-3 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>

        {/* Institution Name & Year of Completion */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Institution Name
            </label>
            <input
              type="text"
              placeholder="Enter institution name"
              className="w-full p-3 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Year of Completion
            </label>
            <input
              type="number"
              placeholder="Enter the year"
              className="w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Grade & Additional Awards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Grade/Score
            </label>
            <input
              type="text"
              placeholder="Enter grade/score (e.g., A, First Class)"
              className="w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Additional Awards
            </label>
            <input
              type="text"
              placeholder="Enter any additional awards"
              className="w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Upload Certificate(s)
          </label>
          <input
            type="file"
            multiple
            className="block w-full text-gray-700 border p-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          <small className="text-gray-500">
            You can upload multiple files (PDF, JPEG, PNG).
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
