import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {useEffect} from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "./components/Navigation.jsx";
import Footer from "./components/Footer.jsx";
import ErrorBoundary from "./utils/ErrorBoundary.jsx";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";


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
  //server restart
  useEffect(() => {
    const hasToastBeenShown = localStorage.getItem('serverRestartToastShown');
    
    if (!hasToastBeenShown) {
      fetch("https://talent-finder-backend.onrender.com/api/users")
      .then(response => {
        if (!response.ok) {
          throw new Error('Server not responding');
        }
      })
      .catch(error => {
        console.error('Failed to wake up server:', error);
      });      toast("Server Restarting,wait a moment")
      
      // Mark that toast has been shown
      localStorage.setItem('serverRestartToastShown', 'true');
    }
  }, []);

  return (
    <>
      <SocketProvider />
      <Router>
      <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              style={{
                position: "fixed",
                top: "20px",
                right: "20px",
                zIndex: 1000,
                color: "#ffffff",
                cursor: "pointer",
              }}
              onClick={() =>
                window.open(
                  "https://github.com/adharsh-a",
                  "_blank"
                )
              }
            >
              <path
                fill="currentColor"
                d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"
              />
            </svg>{" "}
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