import React, { useState } from "react";
import { 
  Button, 
  TextField, 
  Typography, 
  Paper, 
  Box,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Container,
  Link,
  Grid
} from "@mui/material";
import { useNavigate } from "react-router-dom";

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

const HospitalRegister = () => {
  const navigate = useNavigate();
  const [hospital, setHospital] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    location: "",
    registration_number: "",
  });
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setHospital({ ...hospital, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("http://localhost:5000/hospital/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(hospital),
      });
      const data = await response.json();
      
      if (response.ok) {
        setMessage("✅ Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/hospital-login"), 2000);
      } else {
        setMessage(data.error || "❌ Registration failed. Please try again.");
      }
    } catch (error) {
      setMessage("❌ Network error. Please try again later.");
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
              Hospital Registration
            </Typography>
            
            {message && (
              <Typography 
                color={message.startsWith("✅") ? "success" : "error"} 
                align="center" 
                sx={{ 
                  mb: 3,
                  backgroundColor: message.startsWith("✅") ? 'rgba(0, 128, 0, 0.1)' : 'rgba(255, 0, 0, 0.1)',
                  py: 1,
                  borderRadius: 1
                }}
              >
                {message}
              </Typography>
            )}
            
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    label="Hospital Name"
                    variant="outlined"
                    fullWidth
                    name="name"
                    value={hospital.name}
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
                    value={hospital.email}
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
                    value={hospital.password}
                    onChange={handleChange}
                    required
                    sx={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Phone"
                    variant="outlined"
                    fullWidth
                    name="phone"
                    type="tel"
                    value={hospital.phone}
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
                    value={hospital.location}
                    onChange={handleChange}
                    required
                    sx={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Registration Number"
                    variant="outlined"
                    fullWidth
                    name="registration_number"
                    value={hospital.registration_number}
                    onChange={handleChange}
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
                  {isSubmitting ? 'Registering...' : 'Register Hospital'}
                </Button>
              </Box>
            </form>

            <Box mt={4} textAlign="center">
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                Already have an account?{" "}
                <Link 
                  onClick={() => navigate("/hospital-login")}
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

export default HospitalRegister;