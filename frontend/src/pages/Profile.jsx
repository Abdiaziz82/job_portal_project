import { Outlet, useLocation } from "react-router-dom";
import FetchedPersonalDetails from "./FetchedPersonalDetails";
import FetchedNextOfKin from "./FetchedNextOfKin";
import FetchedCertificates from "./FetchedCertificates";
import FetchedEducationalBackground from "./FetchedEducationalBackground";
import FetchedProfessionalQualifications from "./FetchedProfessionalQualifications";
import FetchedRelevantCourses from "./FetchedRelevantCourses";
import FetchedEmploymentDetails from "./FetchedEmploymentDetails";
import FetchedReferees from "./FetchedReferees";
import FetchedPublications from "./FetchedPublications";
import FetchedDuties from "./FetchedDuties";
import FetchedDeclarations from "./FetchedDeclarations";

export default function Profile() {
  const location = useLocation();

  // Only render the main Profile component if we're not on a nested route
  const isProfileMainRoute = location.pathname === "/dashboard/profile";

  return (
    <div className="font space-y-6 w-full pb-10 px-4 sm:px-6 lg:px-8">
      {isProfileMainRoute && (
        <div className="space-y-6">
          {/* Subheading */}
          <div className="text-base sm:text-lg text-gray-800 bg-yellow-50 p-4 rounded-lg border border-yellow-200 shadow-sm">
            <p className="font-bold">
              Please ensure all sections of this form are completed accurately and saved upon filling. For sections that are not applicable, kindly indicate with 'N/A'. (Attach copies of certificates and testimonials as PDF files as indicated in each case.)
            </p>
          </div>

          {/* Profile Sections */}
          <FetchedPersonalDetails />
          <FetchedNextOfKin />
          <FetchedCertificates />
          <FetchedEducationalBackground />
          <FetchedProfessionalQualifications />
          <FetchedRelevantCourses />
          <FetchedEmploymentDetails />
          <FetchedPublications />
          <FetchedDuties />
          <FetchedReferees />
          <FetchedDeclarations />
        </div>
      )}

      {/* The child route components will be displayed here */}
      <div className="mt-6">
        <Outlet />
      </div>
    </div>
  );
}