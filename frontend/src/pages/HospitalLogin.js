import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Link
} from "@mui/material";

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

const HospitalLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/hospital/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (data.token) {
      localStorage.setItem("hospitalToken", data.token);
      navigate("/hospital-dashboard");
    } else {
      setMessage(data.error);
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
            mb: 3
          }}>
            Hospital Login
          </Typography>
          
          {message && (
            <Typography color="error" align="center" sx={{ mb: 2 }}>
              {message}
            </Typography>
          )}
          
          <Box component="form" onSubmit={handleLogin} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2, py: 1.5 }}
            >
              Login
            </Button>
          </Box>
          <Box mt={3} textAlign="center">
            <Typography variant="body2">
              Not have an account?{" "}
              <Link 
                href="#" 
                onClick={() => navigate("/hospital-register")}
                sx={{ color: 'primary.dark', fontWeight: 600 }}
              >
                Register now
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default HospitalLogin;