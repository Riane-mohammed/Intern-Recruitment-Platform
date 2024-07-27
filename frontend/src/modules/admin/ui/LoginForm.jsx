import React from 'react';
import {
  TextField, Button, Checkbox, FormControlLabel, Typography, Box, Paper, Link
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import backgroundUrl from '../../../Assets/Portnet.jpg';

// Import custom fonts
import '@fontsource/roboto'; // Default font for Material-UI
import '@fontsource/poppins'; // Example of custom font
//this is a test
const styles = {
  container: {
    minHeight: '100vh',
    backgroundImage: `url(${backgroundUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    padding: 2, // Add padding for smaller screens
    fontFamily: 'Poppins, Arial, sans-serif', // Set default font
    position: 'relative',
    overflow: 'hidden',
    '&:before': {
      content: '""',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      backdropFilter: 'blur(3px)', // Apply background blur
      zIndex: 1,
    },
  },
  paper: {
    width: { xs: '100%', sm: 420 }, // Full width on small screens, fixed width on larger screens
    padding: { xs: 2, sm: 4 }, // Adjust padding for different screen sizes
    borderRadius: 2,
    backgroundColor: 'rgba(30, 43, 91, 0.8)', // Dark blue background with transparency
    boxShadow: '0 0 10px rgba(0,0,0,.2)',
    color: '#fff',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    fontFamily: 'Poppins, Arial, sans-serif', // Set default font
    zIndex: 2, // Ensure the paper component is above the blur effect
  },
  textField: {
    '& .MuiOutlinedInput-root': {
      backgroundColor: '#fff',
      borderRadius: 5,
      '& fieldset': {
        borderColor: 'rgba(255, 255, 255, 0.2)',
      },
      '&:hover fieldset': {
        borderColor: 'rgba(255, 255, 255, 0.5)',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#fff',
      },
    },
    '& .MuiInputBase-input': {
      color: '#1E2B5B',
    },
    '& .MuiInputLabel-root': {
      color: 'rgba(255, 255, 255, 0.7)',
      fontFamily: 'Poppins, Arial, sans-serif', // Set default font
    },
  },
  button: {
    borderRadius: 5,
    marginTop: 2,
    backgroundColor: '#fff',
    color: '#1E2B5B',
    fontWeight: 700,
    height: 45,
    boxShadow: '0 0 10px rgba(0,0,0,.1)',
    fontFamily: 'Poppins, Arial, sans-serif', // Set default font
    '&:hover': {
      backgroundColor: '#f5f5f5',
    },
  },
  checkbox: {
    color: 'white',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontFamily: 'Poppins, Arial, sans-serif', // Set default font
  },
};

const LoginForm = () => {
  return (
    <Box component="div" sx={styles.container}>
      <Paper elevation={3} sx={styles.paper}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Login
        </Typography>
        <form>
          <Box mb={3}>
            <TextField
              fullWidth
              type="text"
              label="Username"
              variant="outlined"
              required
              InputProps={{
                startAdornment: <AccountCircleIcon sx={{ mr: 1, color: 'rgba(255, 255, 255, 0.7)' }} />,
              }}
              InputLabelProps={{ style: { color: 'rgba(255, 255, 255, 0.7)' } }}
              sx={styles.textField}
            />
          </Box>
          <Box mb={3}>
            <TextField
              fullWidth
              type="password"
              label="Password"
              variant="outlined"
              required
              InputProps={{
                startAdornment: <LockIcon sx={{ mr: 1, color: 'rgba(255, 255, 255, 0.7)' }} />,
              }}
              InputLabelProps={{ style: { color: 'rgba(255, 255, 255, 0.7)' } }}
              sx={styles.textField}
            />
          </Box>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <FormControlLabel
              control={<Checkbox sx={styles.checkbox} />}
              label={<Typography variant="body2" sx={{ color: 'white', fontFamily: 'Poppins, Arial, sans-serif' }}>Remember me?</Typography>}
            />
            <Link href="#" sx={styles.link}>
              Forgot Password?
            </Link>
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={styles.button}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default LoginForm;
