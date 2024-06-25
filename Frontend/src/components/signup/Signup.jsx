import React, { useState } from 'react';
import {
  Button,
  TextField,
  Typography,
  Container,
  Box,
  Alert
} from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Signup = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation
    if (!name) {
      setErrorMessage('Name is required');
      return;
    }
    if (!password) {
      setErrorMessage('Password is required');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    // If validation passes
    setErrorMessage('');
    try {
      let body = {
        username: name, password: password
      }
      const response = await axios.post('http://localhost:8080/api/register', body);
      if (response.status === 200) {
        setSuccessMessage('Signup successful!');

      }

    } catch (error) {
      // alert(error.response.data);
      setErrorMessage(error.response.data);
    }

  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 8,
        }}
      >
        <Typography component="h1" variant="h5">
          Signup Page
        </Typography>


        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        {successMessage && <Alert severity="success">{successMessage}</Alert>}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="password"
            label="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
         <Button
    type="submit"
    fullWidth
    variant="contained"
    margin="normal"
    color="primary"
    sx={{ width: '48%', mt: 3, mb: 2 }}
  >
    Signup
  </Button>
  <Button
    component={Link}
    to="/login"
    variant="contained"
    color="secondary"
    margin="normal"
    sx={{ width: '48%', mt: 3, mb: 2 }}
  >
    Go to login
  </Button>
      </Box>
      </Box>
    </Container>
  );
};

export default Signup;
