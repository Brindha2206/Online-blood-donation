import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DonorLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:1234/donor/login", {
        email,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("donorId", response.data.donorId);
        localStorage.setItem("donorName", response.data.name);
        navigate("/donor-dashboard"); // Redirect after login
      }
    } catch (error) {
      setError(error.response?.data?.message || "❌ Invalid credentials!");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom align="center">
        Donor Login
      </Typography>
      {error && <Typography color="error" align="center">{error}</Typography>}
      <form onSubmit={handleLogin}>
        <Box mb={2}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Box>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>

      {/* Registration Link */}
      <Box mt={2} textAlign="center">
        <Typography variant="body2">
          Not have an account?{" "}
          <Link href="#" onClick={() => navigate("/donor-register")}>
            Register now
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default DonorLogin;
