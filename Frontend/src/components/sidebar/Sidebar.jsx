import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, ListItemIcon, ListItemText, Collapse } from '@mui/material';
import { makeStyles } from '@mui/styles';
import AddIcon from '@mui/icons-material/Add';
import SummarizeIcon from '@mui/icons-material/Summarize';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import DescriptionIcon from '@mui/icons-material/Description';
import { Link } from 'react-router-dom';
import logo from '../splashScreen/logo.svg';
// import { useTheme } from '@mui/material/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  listItemText: {
    color: theme.palette.text.primary,
  },
  logo: {
    display: 'block',
    margin: 'auto',
    width: 50,
    height: 50,
  },
}));

function SimpleList(props) {
  const classes = useStyles();
  // const theme = useTheme();
  const [open, setOpen] = useState({
    addProduct: false,
    reports: false,
  });

  const handleClick = (item) => {
    setOpen((prevState) => ({ ...prevState, [item]: !prevState[item] }));
  };

  return (
    <div className={classes.root}>
      <List component="nav">
        <img src={logo} alt="logo" className={classes.logo} />

        <ListItem component={Link} to="/addProduct">
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="Add Product" classes={{ primary: classes.listItemText }} />
        </ListItem>

        <ListItem onClick={() => handleClick('reports')}>
          <ListItemIcon>
            <SummarizeIcon />
          </ListItemIcon>
          <ListItemText primary="Reports" classes={{ primary: classes.listItemText }} />
          {open.reports ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <Collapse in={open.reports} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem component={Link} to="/CustomerReport" className={classes.nested}>
              <ListItemIcon>
                <DescriptionIcon />
              </ListItemIcon>
              <ListItemText primary="Customer Report" classes={{ primary: classes.listItemText }} />
            </ListItem>
            <ListItem component={Link} to="/ProductReport" className={classes.nested}>
              <ListItemIcon>
                <DescriptionIcon />
              </ListItemIcon>
              <ListItemText primary="Product Report" classes={{ primary: classes.listItemText }} />
            </ListItem>
            <ListItem component={Link} to="/SalesReport" className={classes.nested}>
              <ListItemIcon>
                <DescriptionIcon />
              </ListItemIcon>
              <ListItemText primary="Sales Report" classes={{ primary: classes.listItemText }} />
            </ListItem>
          </List>
        </Collapse>
      </List>
    </div>
  );
}

SimpleList.propTypes = {
  toggle: PropTypes.func.isRequired,
};

export default SimpleList;
