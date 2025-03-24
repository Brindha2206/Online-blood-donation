import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import DonorLogin from "./pages/DonorLogin";
import HospitalLogin from "./pages/HospitalLogin";
import DonorRegister from "./pages/DonorRegister";
import HospitalRegister from "./pages/HospitalRegister";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/donor-login" element={<DonorLogin />} />
        <Route path="/hospital-login" element={<HospitalLogin />} />
        <Route path="/donor-register" element={<DonorRegister />} />
        <Route path="/hospital-register" element={<HospitalRegister/>}/>
      </Routes>
    </Router>
  );
};

export default App;
