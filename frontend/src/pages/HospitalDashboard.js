import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  CircularProgress,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl
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

const HospitalDashboard = () => {
  const navigate = useNavigate();
  const [hospital, setHospital] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [donors, setDonors] = useState([]);
  const [bloodGroup, setBloodGroup] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    const fetchHospitalData = async () => {
      const token = localStorage.getItem("hospitalToken");
      if (!token) {
        navigate("/hospital-login");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/hospital/profile", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await response.json();
        setHospital(data);
      } catch (err) {
        setError("Failed to fetch hospital data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchHospitalData();
  }, [navigate]);

  useEffect(() => {
    if (activeTab === 'donors') {
      fetchDonors();
    }
  }, [bloodGroup, location, activeTab]);

  const fetchDonors = async () => {
    let url = "http://localhost:5000/hospital/donors";
    if (bloodGroup || location) {
      url += `?bloodGroup=${bloodGroup}&location=${location}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      setDonors(data);
    } catch (err) {
      setError("Failed to fetch donors.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("hospitalToken");
    navigate("/hospital-login");
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  if (isLoading) {
    return (
      <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
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
          onClick={() => navigate("/hospital-login")}
          sx={{ mt: 2 }}
        >
          Return to Login
        </Button>
      </Container>
    );
  }

  if (!hospital) {
    return (
      <Container maxWidth="md" sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h5" color="error">
          Hospital data not available
        </Typography>
      </Container>
    );
  }

  return (
    <ThemeProvider theme={medicalTheme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Navigation Tabs */}
        <Paper elevation={3} sx={{ mb: 4, borderRadius: 3 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="fullWidth"
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Overview" value="overview" />
            <Tab label="Blood Inventory" value="inventory" />
            <Tab label="Donors" value="donors" />
            <Tab label="Settings" value="settings" />
          </Tabs>
        </Paper>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <Paper elevation={3} sx={{ p: 4, borderRadius: 3, mb: 4 }}>
            <Typography variant="h4" align="center" gutterBottom sx={{ 
              color: 'primary.dark',
              fontWeight: 700,
              mb: 3
            }}>
              Welcome, {hospital.name}!
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
                      Hospital Information
                    </Typography>
                    <Typography variant="body1"><strong>Email:</strong> {hospital.email}</Typography>
                    <Typography variant="body1"><strong>Phone:</strong> {hospital.phone}</Typography>
                    <Typography variant="body1"><strong>Location:</strong> {hospital.location}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
                      Registration Details
                    </Typography>
                    <Typography variant="body1"><strong>Registration Number:</strong> {hospital.registration_number}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        )}

        {/* Blood Inventory Tab */}
        {activeTab === 'inventory' && (
          <Paper elevation={3} sx={{ p: 4, borderRadius: 3, mb: 4 }}>
            <Typography variant="h4" align="center" gutterBottom sx={{ 
              color: 'primary.dark',
              fontWeight: 700,
              mb: 3
            }}>
              Blood Inventory
            </Typography>
            <Typography variant="body1" color="textSecondary" align="center">
              Blood inventory management will be displayed here
            </Typography>
          </Paper>
        )}

        {/* Donors Tab */}
        {activeTab === 'donors' && (
          <Paper elevation={3} sx={{ p: 4, borderRadius: 3, mb: 4 }}>
            <Typography variant="h4" align="center" gutterBottom sx={{ 
              color: 'primary.dark',
              fontWeight: 700,
              mb: 3
            }}>
              Donor Management
            </Typography>
            
            {/* Filters */}
            <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel>Blood Group</InputLabel>
                <Select
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  label="Blood Group"
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="A+">A+</MenuItem>
                  <MenuItem value="A-">A-</MenuItem>
                  <MenuItem value="B+">B+</MenuItem>
                  <MenuItem value="B-">B-</MenuItem>
                  <MenuItem value="O+">O+</MenuItem>
                  <MenuItem value="O-">O-</MenuItem>
                  <MenuItem value="AB+">AB+</MenuItem>
                  <MenuItem value="AB-">AB-</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Filter by Location"
                variant="outlined"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                sx={{ flexGrow: 1 }}
              />
            </Box>

            {/* Donors Table */}
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: 'grey.100' }}>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Blood Group</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {donors.length > 0 ? (
                    donors.map((donor) => (
                      <TableRow key={donor.id}>
                        <TableCell>{donor.name}</TableCell>
                        <TableCell>{donor.email}</TableCell>
                        <TableCell>{donor.phone}</TableCell>
                        <TableCell>{donor.location}</TableCell>
                        <TableCell>{donor.bloodGroup}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        No donors found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <Paper elevation={3} sx={{ p: 4, borderRadius: 3, mb: 4 }}>
            <Typography variant="h4" align="center" gutterBottom sx={{ 
              color: 'primary.dark',
              fontWeight: 700,
              mb: 3
            }}>
              Account Settings
            </Typography>
            <Typography variant="body1" color="textSecondary" align="center">
              Account settings will be displayed here
            </Typography>
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

export default HospitalDashboard;