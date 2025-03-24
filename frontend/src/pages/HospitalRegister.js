import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
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
      alert("Registration failed! Please try again.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Hospital Registration
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            label="Hospital Name"
            name="name"
            variant="outlined"
            fullWidth
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Email"
            name="email"
            type="email"
            variant="outlined"
            fullWidth
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            fullWidth
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            variant="outlined"
            fullWidth
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Phone Number"
            name="phone"
            type="tel"
            variant="outlined"
            fullWidth
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Location"
            name="location"
            variant="outlined"
            fullWidth
            value={formData.location}
            onChange={handleChange}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Registration Number"
            name="registrationNumber"
            variant="outlined"
            fullWidth
            value={formData.registrationNumber}
            onChange={handleChange}
            required
          />
        </Box>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Register
        </Button>
      </form>
      <Typography align="center" mt={2}>
        Already have an account? <a href="/hospital-login">Login here</a>
      </Typography>
    </Container>
  );
};

export default HospitalRegister;
