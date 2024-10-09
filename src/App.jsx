import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home.jsx";
import {Login} from "./pages/Login.jsx";
import Navigation from "./components/Navigation.jsx";
import { UserDetailsForm } from "./pages/UserDetails.jsx";
import {TalentData} from "./pages/TalentData.jsx"
import ProfileView from "./pages/ProfileView.jsx";
import Footer from "./components/Footer.jsx";
import MyProfile from "./pages/MyProfile.jsx";
import { useDispatch } from "react-redux";
import { logout } from "./redux/authSlice.js";
import { useEffect } from "react";

const AUTO_LOGOUT_TIME = 60*60*1000; // 1 hour in milliseconds


function App() {
  return (
    <>
      <Router>
        <Navigation />
        {/* <Button variant="outline">Hello</Button> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<ProfileView />} />
          <Route path="/auth" element={<Login />} />
          <Route path="/talent-data" element={<UserDetailsForm />} />
          <Route path="/talents" element={<TalentData/>} />
          <Route path="/me" element={<MyProfile />} />
        </Routes>
      </Router>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
