import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa"; // Importing the required icons

export default function FetchedRelevantCourses() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/relevant-courses", {
        credentials: "include", // Include cookies for authentication
      });
      if (response.ok) {
        const data = await response.json();
        setCourses(data);
      } else {
        console.error("Failed to fetch relevant courses:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching relevant courses:", error);
    }
  };

  const handleEditClick = (course) => {
    navigate("edit-relevant-course", { state: { course } });
  };

  const handleDeleteClick = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      const response = await fetch(`http://127.0.0.1:5000/relevant-courses/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        setCourses(courses.filter((course) => course.id !== id));
      } else {
        console.error("Failed to delete course:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2 sm:mb-0">
          Relevant Courses
        </h2>
        <Link
          to="RelevantCoursesForm"
          className="flex items-center bg-green-700 text-white px-3 py-1 rounded-md hover:bg-green-800 transition text-sm sm:text-base whitespace-nowrap"
        >
          <FaPlus className="mr-2" />
          {courses.length > 0 ? `Update Courses` : `Add Courses`}
        </Link>
      </div>

      {courses.length > 0 && <div className="border-t-2 border-gray-300 my-6"></div>}

      {courses.length > 0 ? (
        courses.map((course, index) => (
          <div key={course.id} className="mt-4 space-y-2 border-b pb-4">
            <h3 className="text-md font-semibold">{course.course_name}</h3>
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
              {/* Left Group */}
              <div className="space-y-3">
                <div className="flex items-start">
                  <strong className="text-sm text-gray-700 w-40">Institution:</strong>
                  <span className="text-sm text-gray-600 flex-1">{course.institution}</span>
                </div>
                <div className="flex items-start">
                  <strong className="text-sm text-gray-700 w-40">Year:</strong>
                  <span className="text-sm text-gray-600 flex-1">{course.year}</span>
                </div>
                <div className="flex items-start">
                  <strong className="text-sm text-gray-700 w-40">Details:</strong>
                  <span className="text-sm text-gray-600 flex-1">{course.details}</span>
                </div>
                <div className="flex items-start">
                  <strong className="text-sm text-gray-700 w-40">Duration:</strong>
                  <span className="text-sm text-gray-600 flex-1">{course.duration}</span>
                </div>
              </div>
              {/* Right Group */}
              <div className="space-y-3">
                <div className="flex items-start">
                  <strong className="text-sm text-gray-700 w-40">Professional Body:</strong>
                  <span className="text-sm text-gray-600 flex-1">{course.body_name}</span>
                </div>
                <div className="flex items-start">
                  <strong className="text-sm text-gray-700 w-40">Membership No:</strong>
                  <span className="text-sm text-gray-600 flex-1">{course.membership_no}</span>
                </div>
                <div className="flex items-start">
                  <strong className="text-sm text-gray-700 w-40">Membership Type:</strong>
                  <span className="text-sm text-gray-600 flex-1">{course.membership_type}</span>
                </div>
                <div className="flex items-start">
                  <strong className="text-sm text-gray-700 w-40">Renewal Date:</strong>
                  <span className="text-sm text-gray-600 flex-1">{course.renewal_date}</span>
                </div>
                <div className="flex items-start">
                  <strong className="text-sm text-gray-700 w-40">Created At:</strong>
                  <span className="text-sm text-gray-600 flex-1">{course.created_at}</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-4 mt-4">
              <div
                className="flex items-center bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-all shadow-sm cursor-pointer"
                onClick={() => handleEditClick(course)}
              >
                <FaEdit className="mr-2" />
                <span>Edit</span>
              </div>
              <div
                className="flex items-center bg-red-600 text-white px-5 py-2.5 rounded-lg hover:bg-red-700 transition-all shadow-sm cursor-pointer"
                onClick={() => handleDeleteClick(course.id)}
              >
                <FaTrash className="mr-2" />
                <span>Remove</span>
              </div>
            </div>
            {index !== courses.length - 1 && (
              <div className="border-t-2 border-gray-300 my-6"></div>
            )}
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-600">No relevant courses added yet.</p>
      )}
    </div>
  );
}
