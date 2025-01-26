import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function PersonalDetails() {
  const navigate = useNavigate();
  const counties = [
    "Baringo", "Bomet", "Bungoma", "Busia", "Elgeyo-Marakwet",
    "Embu", "Garissa", "Homa Bay", "Isiolo", "Kajiado", "Kakamega",
    "Kericho", "Kiambu", "Kilifi", "Kirinyaga", "Kisii", "Kisumu",
    "Kitui", "Kwale", "Laikipia", "Lamu", "Machakos", "Makueni",
    "Mandera", "Marsabit", "Meru", "Migori", "Mombasa", "Murang'a",
    "Nairobi", "Nakuru", "Nandi", "Narok", "Nyamira", "Nyandarua",
    "Nyeri", "Samburu", "Siaya", "Taita-Taveta", "Tana River",
    "Tharaka-Nithi", "Trans Nzoia", "Turkana", "Uasin Gishu",
    "Vihiga", "Wajir", "West Pokot"
  ];
  const titles = ["Mr.", "Mrs.", "Miss", "Dr.", "Prof."];

  return (
    <div className="flex flex-col min-h-screen p-6 bg-gray-50">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-green-700 hover:text-green-800 transition mb-4"
      >
        <FaArrowLeft className="mr-2" />
        Back
      </button>

      {/* Form Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Personal Details</h1>

      {/* Form */}
      <form className="bg-white p-6 rounded-lg shadow-md space-y-6">
        {/* Full Names & Title */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Full Names</label>
            <input
              type="text"
              placeholder="Enter your full names"
              className="w-full p-3 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Title</label>
            <select
              className="w-full p-3 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            >
              <option value="">Select Title</option>
              {titles.map((title) => (
                <option key={title} value={title}>
                  {title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Date of Birth & ID Number */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Date of Birth</label>
            <input
              type="date"
              className="w-full p-3 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">ID Number</label>
            <input
              type="text"
              placeholder="Enter your ID number"
              className="w-full p-3 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>

        {/* Gender */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Gender</label>
          <select
            className="w-full p-3 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        {/* Nationality & Home County */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Nationality</label>
            <input
              type="text"
              placeholder="Enter your nationality"
              className="w-full p-3 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Home County</label>
            <select
              className="w-full p-3 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 appearance-none"
            >
              <option value="">Select County</option>
              {counties.map((county) => (
                <option key={county} value={county}>
                  {county}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Constituency & Postal Address */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Constituency</label>
            <input
              type="text"
              placeholder="Enter your constituency"
              className="w-full p-3 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Postal Address</label>
            <input
              type="text"
              placeholder="Enter your postal address"
              className="w-full p-3 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>

        {/* Mobile Number & Email Address */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Mobile Number</label>
            <input
              type="tel"
              placeholder="Enter your mobile number"
              className="w-full p-3 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full p-3 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-green-700 text-white font-medium rounded-md hover:bg-green-800 transition"
          >
            Save Details
          </button>
        </div>
      </form>
    </div>
  );
}
