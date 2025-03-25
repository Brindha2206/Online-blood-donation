import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box, MenuItem, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
      await axios.post("http://localhost:1234/donor/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.mobile,
        location: formData.location,
        blood_group: formData.bloodGroup,
        date_of_birth: formData.dateOfBirth,
      });

      alert("✅ Registration successful! Please log in.");
      navigate("/donor-login"); // Redirect to login page
    } catch (error) {
      setError("❌ Registration failed! Try again.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom align="center">
        Donor Registration
      </Typography>
      {error && <Typography color="error" align="center">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            label="Full Name"
            variant="outlined"
            fullWidth
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Mobile Number"
            variant="outlined"
            fullWidth
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Location"
            variant="outlined"
            fullWidth
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            select
            label="Blood Group"
            variant="outlined"
            fullWidth
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            required
          >
            {bloodGroups.map((group) => (
              <MenuItem key={group} value={group}>
                {group}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box mb={2}>
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
          />
        </Box>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Register
        </Button>
      </form>

      <Box mt={2} textAlign="center">
        <Typography variant="body2">
          Already have an account?{" "}
          <Link href="#" onClick={() => navigate("/donor-login")}>
            Login here
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default DonorRegister;
