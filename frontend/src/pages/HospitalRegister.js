import React, { useState } from "react";
import { 
  TextField, 
  Button, 
  Container, 
  Typography, 
  Box,
  Link,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Paper
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const medicalTheme = createTheme({
  palette: {
    primary: {
      main: '#8e1318',
      dark: '#5a0a0d',
      light: '#c2185b',
    },
    secondary: {
      main: '#00695c',
    },
    background: {
      default: '#fafafa',
      paper: '#ffffff',
    },
  },
});

const HospitalRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    location: "",
    registrationNumber: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/hospital-register", {
        ...formData,
        role: "hospital",
      });
      alert("Registration successful! Please log in.");
      navigate("/hospital-login");
    } catch (error) {
      setError("Registration failed! Please try again.");
    }
  };

  return (
    <ThemeProvider theme={medicalTheme}>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h4" align="center" gutterBottom sx={{ 
            color: 'primary.dark',
            fontWeight: 700,
            mb: 4
          }}>
            Hospital Registration
          </Typography>
          
          {error && (
            <Typography color="error" align="center" sx={{ mb: 3 }}>
              {error}
            </Typography>
          )}
          
          <form onSubmit={handleSubmit}>
            <Box mb={3}>
              <TextField
                label="Hospital Name"
                name="name"
                variant="outlined"
                fullWidth
                value={formData.name}
                onChange={handleChange}
                required
                sx={{ backgroundColor: '#fff' }}
              />
            </Box>
            <Box mb={3}>
              <TextField
                label="Email"
                name="email"
                type="email"
                variant="outlined"
                fullWidth
                value={formData.email}
                onChange={handleChange}
                required
                sx={{ backgroundColor: '#fff' }}
              />
            </Box>
            <Box mb={3}>
              <TextField
                label="Password"
                name="password"
                type="password"
                variant="outlined"
                fullWidth
                value={formData.password}
                onChange={handleChange}
                required
                sx={{ backgroundColor: '#fff' }}
              />
            </Box>
            <Box mb={3}>
              <TextField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                variant="outlined"
                fullWidth
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                sx={{ backgroundColor: '#fff' }}
              />
            </Box>
            <Box mb={3}>
              <TextField
                label="Phone Number"
                name="phone"
                type="tel"
                variant="outlined"
                fullWidth
                value={formData.phone}
                onChange={handleChange}
                required
                sx={{ backgroundColor: '#fff' }}
              />
            </Box>
            <Box mb={3}>
              <TextField
                label="Location"
                name="location"
                variant="outlined"
                fullWidth
                value={formData.location}
                onChange={handleChange}
                required
                sx={{ backgroundColor: '#fff' }}
              />
            </Box>
            <Box mb={4}>
              <TextField
                label="Registration Number"
                name="registrationNumber"
                variant="outlined"
                fullWidth
                value={formData.registrationNumber}
                onChange={handleChange}
                required
                sx={{ backgroundColor: '#fff' }}
              />
            </Box>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              fullWidth
              size="large"
              sx={{
                py: 1.5,
                fontWeight: 600,
                borderRadius: 2
              }}
            >
              Register
            </Button>
          </form>
          
          <Box mt={3} textAlign="center">
            <Typography variant="body2">
              Already have an account?{" "}
              <Link 
                href="#" 
                onClick={() => navigate("/hospital-login")}
                sx={{ color: 'primary.dark', fontWeight: 600 }}
              >
                Login here
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default HospitalRegister;