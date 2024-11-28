import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "./components/Navigation.jsx";
import Footer from "./components/Footer.jsx";
import ErrorBoundary from "./utils/ErrorBoundary.jsx";
import { useSelector } from "react-redux";

// Lazy load all page components
//removed lazy 
import Home from "./pages/Home.jsx";
import {Login} from "./pages/Login.jsx";
import {UserDetailsForm} from "./pages/UserDetails.jsx";
import {ClientDetailsForm} from "./pages/ClientDetails.jsx";
import {TalentData} from "./pages/TalentData.jsx";
import ProfileView from "./pages/ProfileView.jsx";
import MyProfile from "./pages/MyProfile.jsx";
import ClientProfile from "./pages/ClientProfile.jsx";
import AllUsers from "./pages/AllUsers.jsx";
import {JobSearch} from "./pages/JobsSearch.jsx";
import JobDetail from "./pages/JobProfileView.jsx";
import JobPost from "./pages/JobPost.jsx";
import ApplicationsPage from "./pages/ApplicationsPage.jsx";
import ViewJobsPosted from "./pages/ViewJobsPosted.jsx";
import SeeApplicants from "./pages/SeeApplicants.jsx";
import NotFound from "./pages/NotFound.jsx";
import { Toaster } from 'sonner'
import { SocketProvider } from "./context/socketContext.jsx";

const App = () => {
  const role = useSelector((state) => state.auth.role) || "talent";

  return (
    <>
      <SocketProvider />
      <Router>
        <Navigation />
        <ErrorBoundary>
            <Routes>
              <Route  path="/" element={<Home />} />
              <Route  path="/users" element={<AllUsers />} />
              <Route  path="/jobs" element={<JobSearch />} />
              <Route  path="/jobs/:id" element={<JobDetail />} />
              <Route  path="/applications" element={<ApplicationsPage />} />
              
              {role === "client" && (
                <>
                  <Route  path="/create" element={<JobPost />} />
                <Route path="/jobsPosted" element={<ViewJobsPosted />} />
                <Route path="/view-applicants/:jobId" element={<SeeApplicants />} />
                </>
              )}
              
              <Route  path="/:id" element={<ProfileView />} />
              <Route  path="/auth" element={<Login />} />
              <Route  path="/talent-data" element={<UserDetailsForm />} />
              <Route  path="/client-data" element={<ClientDetailsForm />} />
              <Route  path="/talents" element={<TalentData />} />
              <Route  path="/me" element={<MyProfile />} />
              <Route  path="/profile" element={<ClientProfile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
        </ErrorBoundary>
      </Router>
      <Footer />
      
      <ToastContainer />
      <Toaster richColors position="bottom-right" />
      <SocketProvider />
    </>
  );
};

export default App;