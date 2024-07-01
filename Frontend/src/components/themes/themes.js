// themes.js
import { createTheme } from '@mui/material/styles';
import { pink } from '@mui/material/colors';

export const blackAndWhiteTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#000000',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: '#000000',
      secondary: '#000000',
    },
  },
});

export const pinkAndBlackTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: pink[500],
    },
    background: {
      default: '#000000',
      paper: '#000000',
    },
    text: {
      primary: '#ffffff',
      secondary: pink[500],
    },
  },
});
