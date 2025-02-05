// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { FaPlus } from "react-icons/fa";

// export default function FetchedWorkExperience() {
//   const [workExperiences, setWorkExperiences] = useState([]);

//   useEffect(() => {
//     fetchWorkExperiences();
//   }, []);

//   const fetchWorkExperiences = async () => {
//     try {
//       const response = await fetch("http://127.0.0.1:5000/work-experience", {
//         credentials: "include",
//       });
//       if (response.ok) {
//         const data = await response.json();
//         setWorkExperiences(data);
//       }
//     } catch (error) {
//       console.error("Error fetching work experiences:", error);
//     }
//   };

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-md w-full">
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
//         <h2 className="text-lg font-semibold text-gray-800 mb-2 sm:mb-0">
//           Work Experience
//         </h2>
//         <Link
//           to="work-experience"
//           className="flex items-center bg-green-700 text-white px-3 py-1 rounded-md hover:bg-green-800 transition text-sm sm:text-base whitespace-nowrap"
//         >
//           <FaPlus className="mr-2" />
//           {workExperiences.length > 0 ? `Update Work Experience` : `Add Work Experience`}
//         </Link>
//       </div>
//       {workExperiences.length > 0 ? (
//         workExperiences.map((experience) => (
//           <div key={experience.id} className="mt-4 space-y-2">
//             <h3 className="text-md font-semibold">{experience.job_title}</h3>
//             <p className="text-sm text-gray-600">{experience.company_name}</p>
//             <p className="text-sm text-gray-600">{experience.start_date}</p>
//             <p className="text-sm text-gray-600">{experience.end_date}</p>
//             <p className="text-sm text-gray-600">{experience.responsibilities}</p>
//             <p className="text-sm text-gray-600">{experience.achievements}</p>
//             <p className="text-sm text-gray-600">{experience.skills_acquired}</p>
//           </div>
//         ))
//       ) : (
//         <p className="text-sm text-gray-600">No work experience added yet.</p>
//       )}
//     </div>
//   );
// }