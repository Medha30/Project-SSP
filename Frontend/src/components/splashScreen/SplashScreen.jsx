// SplashScreen.js
import React, { useEffect } from 'react';
import './SplashScreen.css';
import logo from './logo.svg';

const SplashScreen = ({ onTimeout }) => {
  useEffect(() => {
    const timer = setTimeout(onTimeout, 2000);
    return () => clearTimeout(timer);
  }, [onTimeout]);

  return (
    <div className="splash-screen">
        <img src={logo} className="App-logo" alt="logo" />
        </div>
  );
};

export default SplashScreen;
