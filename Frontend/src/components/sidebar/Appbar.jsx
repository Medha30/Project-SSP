// ButtonAppBar.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@mui/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import HomeIcon from '@mui/icons-material/Home';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { useNavigate } from 'react-router-dom';
import { Switch, useTheme } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const styles = (theme) => ({
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  toolbarButtons: {
    display: 'flex',
    alignItems: 'center',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.common.white,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
});

function ButtonAppBar(props) {
  const { classes, toggleTheme } = props;
  const navigate = useNavigate();
  const theme = useTheme();
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchToggle = () => {
    setSearchVisible(!searchVisible);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = () => {
    navigate(`/search?query=${searchQuery}`);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: theme.palette.primary.main }}>
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={() => props.toggleLeftbar()}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.flex}>
            Shoppy Shop
          </Typography>
          <div className={classes.toolbarButtons}>
            <IconButton color="inherit" aria-label="Home" onClick={() => navigate('/home')}>
              <HomeIcon /> Home
            </IconButton>
            <IconButton color="inherit" aria-label="Contact Us" onClick={() => navigate('/contactUs')}>
              <ContactMailIcon /> Contact Us
            </IconButton>
            {searchVisible && (
              <div className={classes.search}>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyPress={(ev) => {
                    if (ev.key === 'Enter') {
                      handleSearchSubmit();
                      ev.preventDefault();
                    }
                  }}
                />
              </div>
            )}
            <IconButton color="inherit" aria-label="Search" onClick={handleSearchToggle}>
              <SearchIcon /> Search
            </IconButton>
            <IconButton color="inherit" aria-label="Login" onClick={() => navigate('/login')}>
              <LoginIcon />
            </IconButton>
            <IconButton color="inherit" aria-label="Cart" onClick={() => navigate('/cart')}>
              <ShoppingCartIcon />
            </IconButton>
            
             <Switch
              checked={props.theme === 'dark'}
              onChange={props.toggleTheme}
              color="default"
              inputProps={{ 'aria-label': 'toggle theme' }}
            /> 
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  toggleLeftbar: PropTypes.func.isRequired,
  toggleTheme: PropTypes.func.isRequired,
};

export default withStyles(styles)(ButtonAppBar);
