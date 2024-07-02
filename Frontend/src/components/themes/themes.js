// themes.js
import { createTheme } from '@mui/material/styles';
import { blueGrey, grey, pink } from '@mui/material/colors';

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
      main: blueGrey[500],
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: '#000000',
      secondary: '#000000',    },
      
  },
  
});
