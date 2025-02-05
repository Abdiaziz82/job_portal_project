// import { FaArrowLeft } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";

// export default function WorkExperience() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     job_title: '',
//     company_name: '',
//     start_date: '',
//     end_date: '',
//     responsibilities: '',
//     key_achievements: '',
//     skills_acquired: ''
//   });

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Send POST request to the backend to save work experience
//       const response = await fetch("http://localhost:5000/work-experience", {
//         method: "POST",
//         credentials: "include", // Include cookies for authentication
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || "Failed to save work experience");
//       }

//       const result = await response.json();
//       alert(result.message); // Show success message
//       navigate("/dashboard/profile"); // Redirect to profile page
//     } catch (error) {
//       console.error("Error:", error);
//       alert(error.message || "An error occurred while saving work experience.");
//     }
//   };

//   // Update form data state when input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   return (
//     <div className="flex flex-col min-h-screen p-6 bg-gray-50">
//       {/* Back Button */}
//       <button
//         onClick={() => navigate(-1)}
//         className="flex items-center text-green-700 hover:text-green-800 transition mb-6"
//       >
//         <FaArrowLeft className="mr-2" />
//         Back
//       </button>

//       {/* Form Title */}
//       <h1 className="text-3xl font-bold text-gray-800 mb-8">Work Experience</h1>

//       {/* Form */}
//       <form className="bg-white p-8 rounded-lg shadow-md space-y-6" onSubmit={handleSubmit}>
//         {/* Job Title & Company Name */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-gray-700 font-medium mb-2">Job Title</label>
//             <input
//               type="text"
//               name="job_title"
//               value={formData.job_title}
//               onChange={handleChange}
//               placeholder="Enter your job title"
//               className="w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700 font-medium mb-2">Company Name</label>
//             <input
//               type="text"
//               name="company_name"
//               value={formData.company_name}
//               onChange={handleChange}
//               placeholder="Enter the company's name"
//               className="w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//         </div>

//         {/* Start Date & End Date */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-gray-700 font-medium mb-2">Start Date</label>
//             <input
//               type="date"
//               name="start_date"
//               value={formData.start_date}
//               onChange={handleChange}
//               className="w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700 font-medium mb-2">End Date</label>
//             <input
//               type="date"
//               name="end_date"
//               value={formData.end_date}
//               onChange={handleChange}
//               className="w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//         </div>

//         {/* Responsibilities */}
//         <div>
//           <label className="block text-gray-700 font-medium mb-2">Responsibilities</label>
//           <textarea
//             name="responsibilities"
//             value={formData.responsibilities}
//             onChange={handleChange}
//             placeholder="Briefly describe your responsibilities"
//             rows="4"
//             className="w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//           ></textarea>
//         </div>

//         {/* Achievements */}
//         <div>
//           <label className="block text-gray-700 font-medium mb-2">Key Achievements</label>
//           <textarea
//             name="key_achievements"
//             value={formData.key_achievements}
//             onChange={handleChange}
//             placeholder="Highlight key achievements in this role"
//             rows="4"
//             className="w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//           ></textarea>
//         </div>

//         {/* Skills Acquired */}
//         <div>
//           <label className="block text-gray-700 font-medium mb-2">Skills Acquired</label>
//           <input
//             type="text"
//             name="skills_acquired"
//             value={formData.skills_acquired}
//             onChange={handleChange}
//             placeholder="List skills acquired in this role"
//             className="w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>

//         {/* Submit Button */}
//         <div className="flex justify-end">
//           <button
//             type="submit"
//             className="px-6 py-3 bg-green-700 text-white font-medium rounded-md hover:bg-green-800 transition"
//           >
//             Save Changes
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }