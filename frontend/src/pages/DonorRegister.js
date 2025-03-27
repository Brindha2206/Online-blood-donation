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
  Paper,
  Grid
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
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
      letterSpacing: 0.5
    }
  }
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setIsSubmitting(true);
    
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
      setError(error.response?.data?.message || "❌ Registration failed! Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ThemeProvider theme={medicalTheme}>
      <CssBaseline />
      <Box
        sx={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/blood-donation-donorlogin.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          pt: 4
        }}
      >
        <Container maxWidth="md">
          <Paper elevation={6} sx={{ 
            p: 4, 
            borderRadius: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.96)',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)'
          }}>
            <Typography 
              variant="h4" 
              gutterBottom 
              align="center" 
              sx={{ 
                color: 'primary.dark',
                mb: 4,
                textTransform: 'uppercase'
              }}
            >
              Become a Blood Donor
            </Typography>
            
            {error && (
              <Typography 
                color="error" 
                align="center" 
                sx={{ 
                  mb: 3,
                  backgroundColor: 'rgba(255, 0, 0, 0.1)',
                  py: 1,
                  borderRadius: 1
                }}
              >
                {error}
              </Typography>
            )}
            
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Full Name"
                    variant="outlined"
                    fullWidth
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    sx={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    sx={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    sx={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Confirm Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    sx={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Mobile Number"
                    variant="outlined"
                    fullWidth
                    name="mobile"
                    type="tel"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                    sx={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Location"
                    variant="outlined"
                    fullWidth
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    sx={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    select
                    label="Blood Group"
                    variant="outlined"
                    fullWidth
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    required
                    sx={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
                  >
                    {bloodGroups.map((group) => (
                      <MenuItem key={group} value={group}>
                        {group}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} md={6}>
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
                    sx={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
                  />
                </Grid>
              </Grid>

              <Box mt={4} textAlign="center">
                <Button 
                  type="submit" 
                  variant="contained" 
                  color="primary" 
                  fullWidth
                  size="large"
                  disabled={isSubmitting}
                  sx={{
                    py: 1.5,
                    fontWeight: 600,
                    borderRadius: 2,
                    fontSize: '1.1rem',
                    maxWidth: 300,
                    mx: 'auto'
                  }}
                >
                  {isSubmitting ? 'Registering...' : 'Register Now'}
                </Button>
              </Box>
            </form>

            <Box mt={4} textAlign="center">
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                Already have an account?{" "}
                <Link 
                  onClick={() => navigate("/donor-login")}
                  sx={{ 
                    color: 'primary.dark', 
                    fontWeight: 600,
                    '&:hover': {
                      cursor: 'pointer',
                      textDecoration: 'underline'
                    }
                  }}
                >
                  Login here
                </Link>
              </Typography>
            </Box>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default DonorRegister;