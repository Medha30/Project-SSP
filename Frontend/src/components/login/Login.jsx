import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, TextField, Typography, Box, Alert, Container } from '@mui/material';
import axios from 'axios';
import { AuthContext } from '../globalContext/AuthContext';
import axiosInstance from '../../utils/axios/axiosInstance';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();
  // const [loggedIn, setLoggedIn] = useState(false);
  const { login,logout,user,token } = useContext(AuthContext);

  const validate = () => {
    let isValid = true;
    setUsernameError('');
    setPasswordError('');

    if (!username.trim()) {
      setUsernameError('Username is required');
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError('Password is required');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.post('http://localhost:8080/api/login', {
          username: username,
          password: password
        });
        if (response.status === 200) {
          const user = response.data.slice(0, -15);
          const token = response.data.slice(-15);

          login(user, token);
          // setLoggedIn(true);
          navigate('/Home'); // Redirect to profile page after login
        }
      } catch (error) {
        if (error.response) {
          setApiError(error.response.data || 'An error occurred');
        } else {
          setApiError('An error occurred. Please try again later.');
        }
      }
    }
  };

  
  const handleLogout = async() => {
    try {
      const response = await axiosInstance.post('/api/logout', {
        username: user , loginToken: token});
      logout();
    // setUser(null);
    } catch (error) {
      setApiError(error.response.data || 'An error occurred');
    }
};

  return (<>
    {user == null && 
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: '100%', // Ensure form takes full width of container
            mt: 3,
          }}
        >
          <Typography variant="h4" gutterBottom>
            Login
          </Typography>
          {apiError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {apiError}
            </Alert>
          )}
          <TextField
            label="Username"
            variant="outlined"
            value={username}
            fullWidth
            onChange={(e) => setUsername(e.target.value)}
            error={Boolean(usernameError)}
            helperText={usernameError}
            margin="normal"
            sx={{ mb: 2 }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={Boolean(passwordError)}
            helperText={passwordError}
            margin="normal"
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" color="primary" sx={{ width: '100%', mb: 2 }}>
            Login
          </Button>
          <Button
            component={Link}
            to="/signup"
            variant="contained"
            color="secondary"
            sx={{ width: '100%' }}
          >
            Go to Signup
          </Button>
        </Box>
      </Box>
    </Container>}

    <Container maxWidth="sm">
            {user && (
                <Box mt={4} p={3} boxShadow={3} bgcolor="background.paper">
                    <Typography variant="h4" gutterBottom>
                        Welcome, {user}!
                    </Typography>
                    <Button variant="contained" color="primary" onClick={handleLogout}>
                        Logout
                    </Button>
                </Box>
            )}
        </Container>
    </>
  );
};

export default Login;
