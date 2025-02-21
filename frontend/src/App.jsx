import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import UserDashboard from "./pages/UserDashboard";
import Dashboard from "./pages/Dashboard";
import BrowseJobs from "./pages/BrowseJobs";
import MyApplications from "./pages/MyApplications";
import SavedJobs from "./pages/SavedJobs";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import Logout from "./pages/Logout";
import PersonalDetails from "./pages/PersonalDetails";
import Certificates from "./pages/Certificates";
import Education from "./pages/Education";
import Referees from "./pages/Referees";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedAdminRoute from "./components/Admin/ProtectedAdminRoute";
import AdminLoginForm from "./components/Admin/AdminLoginForm";

// Import layouts and admin pages
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import ManageJobs from "./pages/AdminDashboard/ManageJobs";
import ViewApplications from "./pages/AdminDashboard/ViewApplications";
import ManageUsers from "./pages/AdminDashboard/ManageUsers";
import CreatedJobs from "./pages/AdminDashboard/CreatedJobs";
import NextOfKinForm from "./pages/NextOfKinForm";
import ProfessionalQualificationsForm from "./pages/ProfessionalQualifications";
import RelevantCoursesForm from "./pages/RelevantCoursesForm";
import EmploymentDetailsForm from "./pages/EmploymentDetailsForm";
import EditPersonalDetails from "./pages/EditPersonalDetails";
import EditNextOfKin from "./pages/EditNextOfKin";
import EditCertificate from "./pages/EditCertificate";
import EditProfessionalQualification from "./pages/EditProfessionalQualification";
import EditEducationalBackground from "./pages/EditEducationalBackground";
import EditEmploymentDetails from "./pages/EditEmploymentDetails";
import EditRelevantCourse from "./pages/EditRelevantCourse";
import EditReferee from "./pages/EditReferee";
import JobDetails from "./pages/JobDetails";

import ViewProfile from "./pages/AdminDashboard/ViewProfile";

import MoreJobDetails from "./pages/MoreJobDetails";
import OpenJobs from "./pages/Openjobs";
import ChangePassword from "./pages/ChangePassword";
import PortalGuide from "./pages/PortalGuide";
import HeroSection from "./pages/HeroSection";
import PublicationsForm from "./pages/PublicationsForm";
import EditPublications from "./pages/EditPublications";
import DutiesForm from "./pages/DutiesForm";
import EditDuties from "./pages/EditDuties";
import DeclarationForm from "./pages/DeclarationForm";
import EditDeclaration from "./pages/EditDeclaration";

function App() {
  return (
    
    <Router>
   
      <Routes>
        {/* USER ROUTES */}
        <Route
          path="/*"
          element={
            <UserLayout>
              <Routes>
              <Route path="/" element={<HeroSection />} />
              
              
                <Route path="/signup" element={<SignUp />} />
                {/* <Route path="/open-jobs" element={<Openjobs />} /> */}
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
                <Route path="/portal-guide" element={<PortalGuide />} />
                <Route path="/open-jobs" element={<OpenJobs />} />
                <Route path="/open-jobs/:id" element={<MoreJobDetails />} />

                {/* User Dashboard */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <UserDashboard />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Dashboard />} />
                  <Route path="browse-jobs/*" element={<BrowseJobs />} />
                  
                  <Route path="my-applications" element={<MyApplications />} />
                  <Route path="saved-jobs" element={<SavedJobs />} />
                 
                  <Route path="profile" element={<Profile />}>
                  
                    <Route path="personal-details" element={<PersonalDetails />} />
                    <Route path="next-of-kin" element={<NextOfKinForm />} />
                    {/* <Route path="work-experience" element={<WorkExperience />} /> */}
                    <Route path="certificates" element={<Certificates />} />
                    <Route path="education" element={<Education />} />
                    <Route path="RelevantCoursesForm" element={<RelevantCoursesForm />} />
                    <Route path="EmploymentDetailsForm" element={<EmploymentDetailsForm />} />
                    <Route path="referees" element={<Referees />} />
                    <Route path="publications-form" element={<PublicationsForm />} />
                    <Route path="duties-form" element={<DutiesForm />} />
                    <Route path="declaration-form" element={<DeclarationForm />} />
                    <Route path="ProfessionalQualifications" element={<ProfessionalQualificationsForm />} />
                    <Route path="edit-personal-details" element={<EditPersonalDetails />} />
                    <Route path="edit-next-of-kin" element={<EditNextOfKin />} />
                    <Route path="edit-certificate" element={<EditCertificate />} />
                    <Route path="edit-professional-qualification" element={<EditProfessionalQualification />} />
                    <Route path="edit-educational-background" element={<EditEducationalBackground />} />
                    <Route path="edit-employment-details" element={<EditEmploymentDetails />} />
                    <Route path="edit-relevant-course" element={<EditRelevantCourse />} />
                    <Route path="edit-referee" element={<EditReferee />} />
                    <Route path="edit-publication" element={<EditPublications />} />
                    <Route path="edit-duty" element={<EditDuties />} />
                    <Route path="edit-declaration" element={<EditDeclaration />} />
                    
                  </Route>
                  
                  <Route path="change-password" element={< ChangePassword />} />
                  <Route path="logout" element={<Logout />} />
                </Route>
              </Routes>
            </UserLayout>
          }
        />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin/*"
          element={
            <Routes>
              <Route path="login" element={<AdminLoginForm />} />
              <Route
                path="dashboard/*"
                element={
                  <ProtectedAdminRoute>
                    <AdminLayout />
                  </ProtectedAdminRoute>
                }
              >
                {/* Nested Admin Routes */}
                <Route index element={<AdminDashboard />} />
                <Route path="manage-jobs" element={<ManageJobs />} />
                <Route path="created-jobs" element={<CreatedJobs />} />

                <Route path="view-applications" element={<ViewApplications />} />
                <Route path="manage-users" element={<ManageUsers />} />
                <Route path="view-profile/:userId" element={<ViewProfile />} />
              </Route>
            </Routes>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
