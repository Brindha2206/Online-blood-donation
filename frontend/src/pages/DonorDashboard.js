import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Container, Typography, Paper, Box } from "@mui/material";

const DonorDashboard = () => {
  const navigate = useNavigate();
  const [donor, setDonor] = useState(null);

  useEffect(() => {
    const donorId = localStorage.getItem("donorId");
    
    if (!donorId) {
      navigate("/donor-login");
      return;
    }

    // Fetch donor details from backend
    axios
      .get(`http://localhost:1234/donor/${donorId}`)
      .then((res) => {
        setDonor(res.data);
      })
      .catch((err) => {
        console.error("Error fetching donor data:", err);
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("donorId");
    localStorage.removeItem("donorName");
    navigate("/donor-login");
  };

  if (!donor) {
    return <Typography variant="h5" align="center">Loading...</Typography>;
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h4" align="center" gutterBottom>
          Welcome, {donor.name}!
        </Typography>

        <Box mt={2}>
          <Typography variant="h6">📧 Email: {donor.email}</Typography>
          <Typography variant="h6">📍 Location: {donor.location}</Typography>
          <Typography variant="h6">🩸 Blood Group: {donor.blood_group}</Typography>
          <Typography variant="h6">📅 Date of Birth: {donor.date_of_birth}</Typography>
        </Box>

        <Box mt={3}>
          <Typography variant="h5" gutterBottom>
            🏥 Donation History:
          </Typography>
          {donor.donation_history !== "nil" ? (
            <Typography variant="body1">{donor.donation_history}</Typography>
          ) : (
            <Typography variant="body1" color="textSecondary">
              No donation records yet.
            </Typography>
          )}
        </Box>

        <Box mt={3} textAlign="center">
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default DonorDashboard;
