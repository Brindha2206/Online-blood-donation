import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  Button, 
  Container, 
  Typography, 
  Box, 
  TextField, 
  Checkbox, 
  FormControlLabel,
  Link,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Paper
} from "@mui/material";
import { 
  Person as PersonIcon, 
  Lock as LockIcon 
} from "@mui/icons-material";

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

const LoginPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Info:", e.target);
    navigate("/dashboard");
  };

  return (
    <ThemeProvider theme={medicalTheme}>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Paper elevation={3} sx={{ 
          p: 4, 
          borderRadius: 3,
          textAlign: 'center'
        }}>
          <Typography variant="h3" gutterBottom sx={{ 
            color: 'primary.dark',
            fontWeight: 700,
            mb: 4
          }}>
            Login
          </Typography>
          
          <form onSubmit={handleSubmit}>
            <Box mb={3}>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                InputProps={{
                  startAdornment: <PersonIcon sx={{ color: 'action.active', mr: 1 }} />
                }}
                sx={{ backgroundColor: '#fff' }}
              />
            </Box>
            <Box mb={3}>
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                InputProps={{
                  startAdornment: <LockIcon sx={{ color: 'action.active', mr: 1 }} />
                }}
                sx={{ backgroundColor: '#fff' }}
              />
            </Box>
            <Box mb={3} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Remember me"
              />
              <Link href="#" sx={{ color: 'primary.dark' }}>
                Forgot password?
              </Link>
            </Box>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              fullWidth
              size="large"
              sx={{
                py: 1.5,
                fontWeight: 600,
                borderRadius: 2,
                mb: 3
              }}
            >
              Log In
            </Button>
          </form>
          
          <Typography variant="body2">
            Don't have an account?{" "}
            <Link href="#" sx={{ color: 'primary.dark', fontWeight: 600 }}>
              Sign up
            </Link>
          </Typography>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default LoginPage;