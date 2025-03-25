import React, { useState } from "react";
import { 
  TextField, 
  Button, 
  Container, 
  Typography, 
  Box, 
  MenuItem, 
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

const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

const DonorRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    location: "",
    bloodGroup: "",
    dateOfBirth: "",
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
      await axios.post("http://localhost:5000/donor/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.mobile,
        location: formData.location,
        blood_group: formData.bloodGroup,
        date_of_birth: formData.dateOfBirth,
      });

      alert("✅ Registration successful! Please log in.");
      navigate("/donor-login");
    } catch (error) {
      setError("❌ Registration failed! Try again.");
    }
  };

  return (
    <ThemeProvider theme={medicalTheme}>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h4" gutterBottom align="center" sx={{ 
            color: 'primary.dark',
            fontWeight: 700,
            mb: 4
          }}>
            Donor Registration
          </Typography>
          
          {error && (
            <Typography color="error" align="center" sx={{ mb: 3 }}>
              {error}
            </Typography>
          )}
          
          <form onSubmit={handleSubmit}>
            <Box mb={3}>
              <TextField
                label="Full Name"
                variant="outlined"
                fullWidth
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                sx={{ backgroundColor: '#fff' }}
              />
            </Box>
            <Box mb={3}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                sx={{ backgroundColor: '#fff' }}
              />
            </Box>
            <Box mb={3}>
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                sx={{ backgroundColor: '#fff' }}
              />
            </Box>
            <Box mb={3}>
              <TextField
                label="Confirm Password"
                type="password"
                variant="outlined"
                fullWidth
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                sx={{ backgroundColor: '#fff' }}
              />
            </Box>
            <Box mb={3}>
              <TextField
                label="Mobile Number"
                variant="outlined"
                fullWidth
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
                sx={{ backgroundColor: '#fff' }}
              />
            </Box>
            <Box mb={3}>
              <TextField
                label="Location"
                variant="outlined"
                fullWidth
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                sx={{ backgroundColor: '#fff' }}
              />
            </Box>
            <Box mb={3}>
              <TextField
                select
                label="Blood Group"
                variant="outlined"
                fullWidth
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                required
                sx={{ backgroundColor: '#fff' }}
              >
                {bloodGroups.map((group) => (
                  <MenuItem key={group} value={group}>
                    {group}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box mb={4}>
              <TextField
                label="Date of Birth"
                type="date"
                variant="outlined"
                fullWidth
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
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
                onClick={() => navigate("/donor-login")}
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

export default DonorRegister;