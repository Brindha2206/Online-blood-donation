import React from "react";
import { Button, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "10vh" }}>
      <Typography variant="h4" gutterBottom>
        Welcome to Online Blood Donation
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        Connecting donors and hospitals in need.
      </Typography>
      
      <Box mt={4}>
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth 
          onClick={() => navigate("/donor-login")}
          sx={{ mb: 2 }}
        >
          Login as Donor
        </Button>
        <Button 
          variant="outlined" 
          color="primary" 
          fullWidth 
          onClick={() => navigate("/hospital-login")}
        >
          Login as Hospital
        </Button>
      </Box>
    </Container>
  );
};

export default LandingPage;
