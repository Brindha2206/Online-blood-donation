import React from "react";
import { Button, Container, Typography, Box, AppBar, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Navigation Bar */}
      <AppBar position="static" sx={{ mb: 4 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Online Blood Donation
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" sx={{ textAlign: "center", mt: 10 }}>
        <Typography variant="h4" gutterBottom>
          Welcome to Online Blood Donation
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Connecting donors and hospitals in need.
        </Typography>

        {/* Login Buttons */}
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
    </>
  );
};

export default LandingPage;
