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
      {courses.length > 0 ? (
        courses.map((course) => (
          <div key={course.id} className="mt-4 space-y-2 border-b pb-4">
            <h3 className="text-md font-semibold">{course.course_name}</h3>
            <p className="text-sm text-gray-600">
              <strong>Institution:</strong> {course.institution}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Year:</strong> {course.year}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Details:</strong> {course.details}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Duration:</strong> {course.duration}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Professional Body:</strong> {course.body_name}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Membership No:</strong> {course.membership_no}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Membership Type:</strong> {course.membership_type}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Renewal Date:</strong> {course.renewal_date}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Created At:</strong> {course.created_at}
            </p>
            <div className="flex space-x-4 mt-2">
              <button
                className="flex items-center text-blue-600 hover:underline"
                onClick={() => handleEditClick(course)}
              >
                <FaEdit className="mr-1" /> Edit
              </button>
              <button className="flex items-center text-red-600 hover:underline">
                <FaTrash className="mr-1" /> Remove
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-600">No relevant courses added yet.</p>
      )}
    </div>
  );
}