import { Outlet, useLocation } from "react-router-dom";
import FetchedPersonalDetails from "./FetchedPersonalDetails";
import FetchedNextOfKin from "./FetchedNextOfKin";
import FetchedWorkExperience from "./FetchedWorkExperience";
import FetchedCertificates from "./FetchedCertificates";
import FetchedEducationalBackground from "./FetchedEducationalBackground";
import FetchedProfessionalQualifications from "./FetchedProfessionalQualifications";
import FetchedRelevantCourses from "./FetchedRelevantCourses";
import FetchedEmploymentDetails from "./FetchedEmploymentDetails";
import FetchedReferees from "./FetchedReferees";

export default function Profile() {
  const location = useLocation();

  // Only render the main Profile component if we're not on a nested route
  const isProfileMainRoute = location.pathname === "/dashboard/profile";

  return (
    <div className="space-y-6 w-full pb-10 px-4 sm:px-6 lg:px-8">
      {isProfileMainRoute && (
        <div className="space-y-6">
          <FetchedPersonalDetails />
          <FetchedNextOfKin />
          <FetchedWorkExperience />
          <FetchedCertificates />
          <FetchedEducationalBackground />
          <FetchedProfessionalQualifications />
          <FetchedRelevantCourses />
          <FetchedEmploymentDetails />
          <FetchedReferees />
        </div>
      )}

      {/* The child route components will be displayed here */}
      <div className="mt-6">
        <Outlet />
      </div>
    </div>
  );
}