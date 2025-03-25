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
  Container
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

const HospitalRegister = () => {
  const [hospital, setHospital] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    location: "",
    registration_number: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setHospital({ ...hospital, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:1234/hospital/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(hospital),
    });
    const data = await response.json();
    setMessage(data.message || data.error);
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
            Hospital Registration
          </Typography>
          
          {message && (
            <Typography color="error" align="center" sx={{ mb: 2 }}>
              {message}
            </Typography>
          )}
          
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Hospital Name"
              name="name"
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Location"
              name="location"
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Registration Number"
              name="registration_number"
              onChange={handleChange}
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
              Register
            </Button>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default HospitalRegister;