import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@mui/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
 import IconButton from '@mui/material/IconButton';
 import MenuIcon from '@mui/icons-material/Menu';
 import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';

const styles = {
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
};

function ButtonAppBar(props) {
  const { classes } = props;
  const navigate = useNavigate();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={() => props.toggleLeftbar()}>
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit" className={classes.flex}>
            Shoppy Shop
          </Typography>
          <IconButton
            style={{ marginRight: -12 }}
            className={classes.menuButton}
            color="inherit"
            aria-label="Login"
            onClick={() => navigate('/login')}
          >
            <LoginIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);
