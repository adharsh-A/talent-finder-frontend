import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { increment, decrement } from "./redux/counterSlice.js";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home.jsx";
import {Login} from "./pages/Login.jsx";
import Navigation from "./components/Navigation.jsx";
import { Button } from "@/components/ui/button";
import ColorPalette from "./components/Color.jsx";
import { UserDetailsForm } from "./pages/UserDetails.jsx";
import {TalentData} from "./pages/TalentData.jsx"

function App() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <>
      <Router>
        <Navigation />
        {/* <Button variant="outline">Hello</Button> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Login />} />
          <Route path="/talent-data" element={<UserDetailsForm />} />
          <Route path="/talents" element={<TalentData/>} />
        </Routes>
      </Router>
      <ColorPalette />

      <ToastContainer />
    </>
  );
}

export default App;
