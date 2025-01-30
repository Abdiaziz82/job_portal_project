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
import WorkExperience from "./pages/WorkExperience";
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
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />

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
                  <Route path="browse-jobs" element={<BrowseJobs />} />
                  <Route path="my-applications" element={<MyApplications />} />
                  <Route path="saved-jobs" element={<SavedJobs />} />
                  <Route path="profile" element={<Profile />}>
                    <Route path="personal-details" element={<PersonalDetails />} />
                    <Route path="Next of Kin" element={<NextOfKinForm />} />
                    <Route path="work-experience" element={<WorkExperience />} />
                    <Route path="certificates" element={<Certificates />} />
                    <Route path="education" element={<Education />} />
                    <Route path="referees" element={<Referees />} />
                    <Route path="ProfessionalQualifications" element={<ProfessionalQualificationsForm />} />
                    
                  </Route>
                  <Route path="notifications" element={<Notifications />} />
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
              </Route>
            </Routes>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
