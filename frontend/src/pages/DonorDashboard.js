import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  Button, 
  Container, 
  Typography, 
  Paper, 
  Box,
  Grid,
  Card,
  CardContent,
  createTheme,
  ThemeProvider,
  CssBaseline,
  CircularProgress
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

const bloodGroupInfo = {
  "A+": {
    donateTo: ["A+", "AB+"],
    receiveFrom: ["A+", "A-", "O+", "O-"],
    facts: "People with A+ can donate to A+ and AB+ groups. A+ is found in about 30% of the population.",
    characteristics: "May have slightly higher risk of heart disease but lower risk of pancreatic cancer.",
    donationTips: "Your platelets are especially valuable for cancer patients."
  },
  "A-": {
    donateTo: ["A+", "A-", "AB+", "AB-"],
    receiveFrom: ["A-", "O-"],
    facts: "A- is rare, found in only 6% of the population. Known as the universal platelet donor for A and AB blood types.",
    characteristics: "Your red blood cells can be used for premature babies and patients with weak immune systems.",
    donationTips: "Consider donating whole blood every 56 days or platelets more frequently."
  },
  "B+": {
    donateTo: ["B+", "AB+"],
    receiveFrom: ["B+", "B-", "O+", "O-"],
    facts: "B+ blood type is found in about 9% of people. More common in Asian populations (up to 25%).",
    characteristics: "May have higher risk of ovarian cancer but better gut microbiome diversity. Often called the 'nomadic' blood type.",
    donationTips: "Your red blood cells are particularly needed for patients with sickle cell disease."
  },
  "B-": {
    donateTo: ["B+", "B-", "AB+", "AB-"],
    receiveFrom: ["B-", "O-"],
    facts: "B- is a rare blood type, found in only 2% of the population. Most common in people of Asian descent.",
    characteristics: "Your plasma can be given to patients with any blood type. Your red cells are valuable for patients with thalassemia.",
    donationTips: "Consider donating power red (double red cells) to maximize your impact."
  },
  "O+": {
    donateTo: ["O+", "A+", "B+", "AB+"],
    receiveFrom: ["O+", "O-"],
    facts: "O+ is the most common blood type, present in 37% of people. Known as the 'universal donor' for red blood cells.",
    characteristics: "May have lower risk of pancreatic cancer but higher risk of ulcers. Often called the 'hunter' blood type.",
    donationTips: "Your whole blood is always in high demand for trauma patients and emergency situations."
  },
  "O-": {
    donateTo: ["All blood groups"],
    receiveFrom: ["O-"],
    facts: "O- is the universal donor, meaning it can be given to anyone. Only about 7% of the population has O- blood.",
    characteristics: "Most needed blood type for emergencies when blood type is unknown. Your blood is crucial for newborns.",
    donationTips: "Consider scheduling regular donations as your blood is critical for trauma cases and infants."
  },
  "AB+": {
    donateTo: ["AB+"],
    receiveFrom: ["All blood groups"],
    facts: "AB+ is the universal plasma donor, found in 3% of people. The rarest of the ABO blood types.",
    characteristics: "Your plasma can be given to patients of any blood type. You have both A and B antigens on your red cells.",
    donationTips: "Consider plasma or platelet donations which can be done more frequently (every 7 days)."
  },
  "AB-": {
    donateTo: ["AB+", "AB-"],
    receiveFrom: ["AB-", "A-", "B-", "O-"],
    facts: "AB- is the rarest blood type, found in less than 1% of people. Only about 0.6% of the US population has AB- blood.",
    characteristics: "Your plasma is compatible with all blood types. Your platelets are valuable for cancer patients.",
    donationTips: "Platelet donations from AB- donors are especially valuable and can be made every 7 days up to 24 times a year."
  }
};

const DonorDashboard = () => {
  const navigate = useNavigate();
  const [donor, setDonor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDonorData = async () => {
      const donorId = localStorage.getItem("donorId");
      const token = localStorage.getItem("token");

      if (!donorId || !token) {
        navigate("/donor-login");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:1234/donor/${donorId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setDonor(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch donor data");
        console.error("Error fetching donor data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDonorData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("donorId");
    localStorage.removeItem("donorName");
    localStorage.removeItem("token");
    navigate("/donor-login");
  };

  if (isLoading) {
    return (
      <Container maxWidth="md" sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '80vh' 
      }}>
        <CircularProgress size={60} color="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h5" color="error" gutterBottom>
          {error}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/donor-login")}
          sx={{ mt: 2 }}
        >
          Return to Login
        </Button>
      </Container>
    );
  }

  if (!donor) {
    return (
      <Container maxWidth="md" sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h5" color="error">
          Donor data not available
        </Typography>
      </Container>
    );
  }

  const bloodInfo = bloodGroupInfo[donor.blood_group] || {};

  return (
    <ThemeProvider theme={medicalTheme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Donor Information Section */}
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3, mb: 4 }}>
          <Typography variant="h4" align="center" gutterBottom sx={{ 
            color: 'primary.dark',
            fontWeight: 700,
            mb: 3
          }}>
            Welcome, {donor.name}!
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
                    Personal Information
                  </Typography>
                  <Typography variant="body1"><strong>Email:</strong> {donor.email}</Typography>
                  <Typography variant="body1"><strong>Phone:</strong> {donor.phone}</Typography>
                  <Typography variant="body1"><strong>Location:</strong> {donor.location}</Typography>
                  <Typography variant="body1"><strong>Date of Birth:</strong> {donor.date_of_birth}</Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
                    Blood & Donation Info
                  </Typography>
                  <Typography variant="body1">
                    <strong>Blood Group:</strong> {donor.blood_group}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    <strong>Donation History:</strong> {donor.donation_history !== "nil" ? donor.donation_history : "No records yet"}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>

        {/* Blood Group Information Section */}
        {bloodInfo.facts && (
          <Paper elevation={3} sx={{ p: 4, borderRadius: 3, mb: 4 }}>
            <Typography variant="h4" align="center" gutterBottom sx={{ 
              color: 'primary.dark',
              fontWeight: 700,
              mb: 4
            }}>
              Your {donor.blood_group} Blood Group Details
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card sx={{ height: '100%', borderLeft: '4px solid #8e1318' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
                      Compatibility
                    </Typography>
                    <Typography variant="body1">
                      <strong>You can donate to:</strong> {bloodInfo.donateTo.join(", ")}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      <strong>You can receive from:</strong> {bloodInfo.receiveFrom.join(", ")}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card sx={{ height: '100%', borderLeft: '4px solid #00695c' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
                      Medical Characteristics
                    </Typography>
                    <Typography variant="body1">{bloodInfo.characteristics}</Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card sx={{ backgroundColor: 'rgba(142, 19, 24, 0.05)' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
                      Donation Recommendations
                    </Typography>
                    <Typography variant="body1">{bloodInfo.donationTips}</Typography>
                    <Typography variant="body1" sx={{ mt: 2 }}>
                      <strong>Interesting Fact:</strong> {bloodInfo.facts}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        )}

        <Box textAlign="center" mt={4}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleLogout}
            sx={{
              px: 4,
              py: 1.5,
              fontWeight: 600,
              borderRadius: 2
            }}
          >
            Logout
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default DonorDashboard;