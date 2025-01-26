import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Referees() {
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
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Referees</h1>

      {/* Referees Form */}
      <form className="bg-white p-8 rounded-lg shadow-md space-y-10">
        {/* Referee 1 */}
        <div>
          <h2 className="text-2xl font-semibold text-green-700 mb-4">Referee 1</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Full Name</label>
              <input
                type="text"
                placeholder="Enter full name"
                className="w-full p-3 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Occupation</label>
              <input
                type="text"
                placeholder="Enter occupation"
                className="w-full p-3 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Address</label>
              <input
                type="text"
                placeholder="Enter address"
                className="w-full p-3 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Post Code</label>
              <input
                type="text"
                placeholder="Enter post code"
                className="w-full p-3 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">City/Town</label>
              <input
                type="text"
                placeholder="Enter city/town"
                className="w-full p-3 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Mobile No</label>
              <input
                type="text"
                placeholder="Enter mobile number"
                className="w-full p-3 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">E-mail Address</label>
              <input
                type="email"
                placeholder="Enter email address"
                className="w-full p-3 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Period for which the referee has known you</label>
              <input
                type="text"
                placeholder="Enter period"
                className="w-full p-3 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
        </div>

        {/* Referee 2 */}
        <div>
          <h2 className="text-2xl font-semibold text-green-700 mb-4">Referee 2</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Full Name</label>
              <input
                type="text"
                placeholder="Enter full name"
                className="w-full p-3 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Occupation</label>
              <input
                type="text"
                placeholder="Enter occupation"
                className="w-full p-3 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Address</label>
              <input
                type="text"
                placeholder="Enter address"
                className="w-full p-3 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Post Code</label>
              <input
                type="text"
                placeholder="Enter post code"
                className="w-full p-3 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">City/Town</label>
              <input
                type="text"
                placeholder="Enter city/town"
                className="w-full p-3 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Mobile No</label>
              <input
                type="text"
                placeholder="Enter mobile number"
                className="w-full p-3 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">E-mail Address</label>
              <input
                type="email"
                placeholder="Enter email address"
                className="w-full p-3 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Period for which the referee has known you</label>
              <input
                type="text"
                placeholder="Enter period"
                className="w-full p-3 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
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
