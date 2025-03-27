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

const DonorLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/donor/login", {
        email,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("donorId", response.data.donorId);
        localStorage.setItem("donorName", response.data.name);
        navigate("/donor-dashboard");
      }
    } catch (error) {
      setError(error.response?.data?.message || "❌ Invalid credentials!");
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
          backgroundRepeat: 'no-repeat',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Container maxWidth="sm" sx={{ py: 8 }}>
          <Paper elevation={3} sx={{ 
            p: 4, 
            borderRadius: 3,
            backgroundColor: 'rgba(255, 255, 255, 0.9)' // Adds slight transparency to see the background
          }}>
            <Typography variant="h4" gutterBottom align="center" sx={{ 
              color: 'primary.dark',
              fontWeight: 700,
              mb: 4
            }}>
              Donor Login
            </Typography>
            
            {error && (
              <Typography color="error" align="center" sx={{ mb: 2 }}>
                {error}
              </Typography>
            )}
            
            <form onSubmit={handleLogin}>
              <Box mb={3}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                  borderRadius: 2,
                  mb: 2
                }}
              >
                Login
              </Button>
            </form>

            <Box mt={3} textAlign="center">
              <Typography variant="body2">
                Not have an account?{" "}
                <Link 
                  href="#" 
                  onClick={() => navigate("/donor-register")}
                  sx={{ color: 'primary.dark', fontWeight: 600 }}
                >
                  Register now
                </Link>
              </Typography>
            </Box>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default DonorLogin;