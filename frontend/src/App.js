import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import DonorLogin from "./pages/DonorLogin";
import DonorRegister from "./pages/DonorRegister";
import DonorDashboard from "./pages/DonorDashboard";
import HospitalLogin from "./pages/HospitalLogin";
import HospitalRegister from "./pages/HospitalRegister";
import HospitalDashboard from "./pages/HospitalDashboard";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Medical theme (consistent across all components)
const medicalTheme = createTheme({
  palette: {
    primary: {
      main: '#8e1318',  // Deep burgundy
      dark: '#5a0a0d',
      light: '#c2185b',
    },
    secondary: {
      main: '#00695c',  // Teal
    },
    background: {
      default: '#fafafa',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={medicalTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Common Routes */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Donor Routes */}
          <Route path="/donor-login" element={<DonorLogin />} />
          <Route path="/donor-register" element={<DonorRegister />} />
          <Route path="/donor-dashboard" element={<DonorDashboard />} />
          
          {/* Hospital Routes */}
          <Route path="/hospital-login" element={<HospitalLogin />} />
          <Route path="/hospital-register" element={<HospitalRegister />} />
          <Route path="/hospital-dashboard" element={<HospitalDashboard />} />
          
          {/* Fallback Route */}
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;