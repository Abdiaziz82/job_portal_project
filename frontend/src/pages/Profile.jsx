import { Link, Outlet, useLocation } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

export default function Profile() {
  const location = useLocation();

  // Only render the main Profile component if we're not on a nested route
  const isProfileMainRoute = location.pathname === "/dashboard/profile";

  return (
    <div className="space-y-6 w-full pb-10">
      {isProfileMainRoute && (
        <>
          {[
            { label: "Personal Details", path: "personal-details" },
            { label: "Next of Kin", path: "Next of Kin" },
            { label: "Work Experience", path: "work-experience" },
            { label: "Certificates", path: "certificates" },
            { label: "Educational Background", path: "education" },
            { label: "ProfessionalQualifications", path: "ProfessionalQualifications" },
            { label: "Referees", path: "referees" },
          ].map((section) => (
            <div
              key={section.label}
              className="p-6 bg-white rounded-lg shadow-md w-full"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {section.label}
                </h2>
                <Link
                  to={section.path}
                  className="flex items-center bg-green-700 text-white px-3 py-1 rounded-md hover:bg-green-800 transition"
                >
                  <FaPlus className="mr-2" />
                  Add {section.label}
                </Link>
              </div>
              <p className="text-sm text-gray-600">
                No {section.label.toLowerCase()} added yet.
              </p>
            </div>
          ))}
        </>
      )}

      {/* The child route components will be displayed here */}
      <div className="mt-6">
        <Outlet />
      </div>
    </div>
  );
}
