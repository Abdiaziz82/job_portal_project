import { Link, Outlet, useLocation } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Profile() {
  const location = useLocation();
  const [workExperiences, setWorkExperiences] = useState([]);
  const [personalDetails, setPersonalDetails] = useState(null);
  const [nextOfKin, setNextOfKin] = useState([]);

  // Only render the main Profile component if we're not on a nested route
  const isProfileMainRoute = location.pathname === "/dashboard/profile";

  // Fetch work experiences, personal details, and next of kin when the component mounts
  useEffect(() => {
    if (isProfileMainRoute) {
      fetchWorkExperiences();
      fetchPersonalDetails();
      fetchNextOfKin();
    }
  }, [isProfileMainRoute]);

  const fetchWorkExperiences = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/work-experience", {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setWorkExperiences(data);
      }
    } catch (error) {
      console.error("Error fetching work experiences:", error);
    }
  };

  const fetchPersonalDetails = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/personal-details", {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setPersonalDetails(data);
      }
    } catch (error) {
      console.error("Error fetching personal details:", error);
    }
  };

  const fetchNextOfKin = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/next-of-kin", {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setNextOfKin(data);
      }
    } catch (error) {
      console.error("Error fetching next of kin:", error);
    }
  };

  return (
    <div className="space-y-6 w-full pb-10 px-4 sm:px-6 lg:px-8">
      {isProfileMainRoute && (
        <div className="space-y-6">
          {[
            { label: "Personal Details", path: "personal-details" },
            { label: "Next of Kin", path: "next-of-kin" },
            { label: "Work Experience", path: "work-experience" },
            { label: "Certificates", path: "certificates" },
            { label: "Educational Background", path: "education" },
            { label: "ProfessionalQualifications", path: "ProfessionalQualifications" },
            { label: "RelevantCourses", path: "RelevantCoursesForm" },
            { label: "EmploymentDetails", path: "EmploymentDetailsForm" },
            { label: "Referees", path: "referees" },
          ].map((section) => (
            <div
              key={section.label}
              className="p-6 bg-white rounded-lg shadow-md w-full"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-2 sm:mb-0">
                  {section.label}
                </h2>
                <Link
                  to={section.path}
                  className="flex items-center bg-green-700 text-white px-3 py-1 rounded-md hover:bg-green-800 transition text-sm sm:text-base whitespace-nowrap"
                >
                  <FaPlus className="mr-2" />
                  {section.label === "Personal Details" && personalDetails
                    ? `Update ${section.label}`
                    : section.label === "Next of Kin" && nextOfKin.length > 0
                    ? `Update ${section.label}`
                    : `Add ${section.label}`}
                </Link>
              </div>
              {section.label === "Personal Details" ? (
                personalDetails ? (
                  <div className="mt-4 space-y-2">
                    <h3 className="text-md font-semibold">{personalDetails.full_names}</h3>
                    <p className="text-sm text-gray-600">{personalDetails.email_address}</p>
                    <p className="text-sm text-gray-600">{personalDetails.mobile_number}</p>
                    {/* Add more fields as needed */}
                  </div>
                ) : (
                  <p className="text-sm text-gray-600">
                    No {section.label.toLowerCase()} added yet.
                  </p>
                )
              ) : section.label === "Next of Kin" ? (
                nextOfKin.length > 0 ? (
                  nextOfKin.map((kin) => (
                    <div key={kin.id} className="mt-4 space-y-2">
                      <h3 className="text-md font-semibold">{kin.kin_name}</h3>
                      <p className="text-sm text-gray-600">{kin.kin_address}</p>
                      <p className="text-sm text-gray-600">{kin.kin_tel}</p>
                      <p className="text-sm text-gray-600">{kin.kin_relationship}</p>
                      {/* Add more fields as needed */}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-600">
                    No {section.label.toLowerCase()} added yet.
                  </p>
                )
              ) : section.label === "Work Experience" ? (
                workExperiences.length > 0 ? (
                  workExperiences.map((experience) => (
                    <div key={experience.id} className="mt-4 space-y-2">
                      <h3 className="text-md font-semibold">{experience.job_title}</h3>
                      <p className="text-sm text-gray-600">{experience.company_name}</p>
                      <p className="text-sm text-gray-600">{experience.responsibilities}</p>
                      {/* Add more fields as needed */}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-600">
                    No {section.label.toLowerCase()} added yet.
                  </p>
                )
              ) : (
                <p className="text-sm text-gray-600">
                  No {section.label.toLowerCase()} added yet.
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* The child route components will be displayed here */}
      <div className="mt-6">
        <Outlet />
      </div>
    </div>
  );
}