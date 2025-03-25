import React from "react";
import { 
  Button, 
  Container, 
  Typography, 
  Box, 
  AppBar, 
  Toolbar,
  createTheme,
  ThemeProvider,
  CssBaseline
} from "@mui/material";
import { useNavigate } from "react-router-dom";

// Create medical professional theme with subtle blood references
const medicalTheme = createTheme({
  palette: {
    primary: {
      main: '#8e1318',  // Deep burgundy (subtle blood reference)
      dark: '#5a0a0d',  // Darker burgundy
      light: '#c2185b', // Medical pinkish-red
    },
    secondary: {
      main: '#00695c',  // Complementary teal for contrast
    },
    background: {
      default: '#fafafa',  // Very light gray
      paper: '#ffffff',    // White for paper components
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h3: {
      fontWeight: 700,
      letterSpacing: '0.5px',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
        },
      },
    },
  },
});

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={medicalTheme}>
      <CssBaseline />
      {/* Professional medical app bar */}
      <AppBar position="static" sx={{ 
        mb: 4, 
        background: 'linear-gradient(135deg, #8e1318 0%, #5a0a0d 100%)',
        boxShadow: 'none',
        borderBottom: '1px solid rgba(0,0,0,0.12)'
      }}>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 700,
                letterSpacing: '0.5px',
                color: 'white'
              }}
            >
              <span style={{ fontWeight: 300 }}>Blood</span> Bridge
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main content area */}
      <Container maxWidth="sm" sx={{ 
        textAlign: "center", 
        mt: 8,
        p: { xs: 3, sm: 4 },
        borderRadius: '12px',
        boxShadow: '0 4px 20px 0 rgba(0,0,0,0.08)',
        backgroundColor: "background.paper",
      }}>
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h3" 
            gutterBottom
            sx={{
              fontWeight: 700,
              color: "primary.dark",
              mb: 3,
              '& span': {
                color: "primary.main"
              }
            }}
          >
            Welcome to <span>Blood Bridge</span>
          </Typography>
          
          <Typography 
            variant="subtitle1" 
            color="text.secondary"
            sx={{
              fontSize: "1.1rem",
              lineHeight: 1.6,
              maxWidth: '80%',
              mx: 'auto'
            }}
          >
            A life-saving network connecting compassionate donors with hospitals and patients in critical need.
          </Typography>
        </Box>

        {/* Action buttons */}
        <Box mt={4} sx={{ maxWidth: 400, mx: "auto" }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            onClick={() => navigate("/donor-login")}
            sx={{ 
              mb: 2.5,
              py: 1.5,
              fontSize: "1rem",
              '&:hover': {
                bgcolor: "primary.dark",
                transform: 'translateY(-1px)',
              },
              transition: 'all 0.2s ease'
            }}
          >
            I Want to Donate
          </Button>
          
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            size="large"
            onClick={() => navigate("/hospital-login")}
            sx={{
              py: 1.5,
              fontSize: "1rem",
              borderWidth: '2px',
              '&:hover': {
                borderWidth: '2px',
                bgcolor: 'rgba(142, 19, 24, 0.04)'
              },
            }}
          >
            Hospital Access
          </Button>
        </Box>

        {/* Subtle medical icon or blood drop could be added here */}
        <Box sx={{ mt: 4, color: 'text.secondary' }}>
          <Typography variant="caption">
            Every drop matters!
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default LandingPage;