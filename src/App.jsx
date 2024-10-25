import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Toaster } from "@/components/ui/toaster"

import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home.jsx";
import { Login } from "./pages/Login.jsx";
import Navigation from "./components/Navigation.jsx";
import { UserDetailsForm } from "./pages/UserDetails.jsx";
import { ClientDetailsForm } from "./pages/ClientDetails.jsx";
import { TalentData } from "./pages/TalentData.jsx";
import ProfileView from "./pages/ProfileView.jsx";
import Footer from "./components/Footer.jsx";
import MyProfile from "./pages/MyProfile.jsx";
import ClientProfile from "./pages/ClientProfile.jsx";
import AllUsers from "./pages/AllUsers.jsx";

import { JobSearch } from "./pages/JobsSearch.jsx";
import JobProfileView from "./pages/JobProfileView.jsx";
import JobPost from "./pages/JobPost.jsx";
import { useSelector } from "react-redux";

import ApplicationsPage from "./pages/ApplicationsPage.jsx";
import ViewJobsPosted from "./pages/ViewJobsPosted.jsx";

import ErrorBoundary from "./utils/ErrorBoundary.jsx";
import NotFound from "./pages/NotFound.jsx";
const App = () => {
  const role = useSelector((state) => state.auth.role) || "talent";

  return (
    <>
      <Router>
        <Navigation />
        <ErrorBoundary>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/users" element={<AllUsers />} />
            <Route exact path="/jobs" element={<JobSearch />} />
            <Route exact path="/jobs/:id" element={<JobProfileView />} />
            <Route exact path="/applications" element={<ApplicationsPage/>} />
            
            {role === "client" && (
              <Route exact path="/create" element={<JobPost />} />
            )}
            {role === "client" && (
              <Route exact path="/jobsPosted" element={<ViewJobsPosted />} />
            )}

            <Route exact path="/:id" element={<ProfileView />} />
            <Route exact path="/auth" element={<Login />} />
            <Route exact path="/talent-data" element={<UserDetailsForm />} />
            <Route exact path="/client-data" element={<ClientDetailsForm />} />
            <Route exact path="/talents" element={<TalentData />} />
            <Route exact path="/me" element={<MyProfile />} />
            <Route exact path="/profile" element={<ClientProfile />} />
            <Route path="*" element={<NotFound />} />

          </Routes>
        </ErrorBoundary>
      </Router>
      <Footer />
      
      <ToastContainer />
      <Toaster />
    </>
  );
}

export default App;
