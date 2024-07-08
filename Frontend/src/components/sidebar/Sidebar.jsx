import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, ListItemIcon, ListItemText, Collapse, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import AddIcon from '@mui/icons-material/Add';
import SummarizeIcon from '@mui/icons-material/Summarize';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import DescriptionIcon from '@mui/icons-material/Description';
import { Link } from 'react-router-dom';
import logo from '../splashScreen/logo.svg';
// import { useTheme } from '@mui/material/styles';
import { AuthContext } from '../globalContext/AuthContext';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ContactMailIcon from '@mui/icons-material/ContactMail';

const useStyles = makeStyles((theme) => ({
 
}));

function SimpleList(props) {

  const { user } = useContext(AuthContext);
  const classes = useStyles();
  // const theme = useTheme();
  const [open, setOpen] = useState({
    addProduct: false,
    reports: false,
    items: false
  });

  const handleClick = (item) => {
    setOpen((prevState) => ({ ...prevState, [item]: !prevState[item] }));
  };

  return (
    <div className={classes.root}>
      <List component="nav">

        <Box textAlign="center">
  <img src={logo} alt="logo" className={classes.logo} width={90} />
</Box>


        <ListItem component={Link} to="/login">
          <ListItemIcon>
            <AccountBoxIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" classes={{ primary: classes.listItemText }} />
        </ListItem>

        { user==='ADMIN' && 
        <ListItem component={Link} to="/addProduct">
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="Add Product" classes={{ primary: classes.listItemText }} />
        </ListItem>
        }
        
        <ListItem onClick={() => handleClick('items')}>
          <ListItemIcon>
            <SummarizeIcon />
          </ListItemIcon>
          <ListItemText primary="Items" classes={{ primary: classes.listItemText }} />
          {open.items ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <Collapse in={open.items} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem component={Link} to="/items/fruit" className={classes.nested}>
              <ListItemIcon>
                <DescriptionIcon />
              </ListItemIcon>
              <ListItemText primary="Fruits " classes={{ primary: classes.listItemText }} />
            </ListItem>
            <ListItem component={Link} to="/items/vegetable" className={classes.nested}>
              <ListItemIcon>
                <DescriptionIcon />
              </ListItemIcon>
              <ListItemText primary="Vegetables " classes={{ primary: classes.listItemText }} />
            </ListItem>
            <ListItem component={Link} to="/items/grocery" className={classes.nested}>
              <ListItemIcon>
                <DescriptionIcon />
              </ListItemIcon>
              <ListItemText primary="Groceries " classes={{ primary: classes.listItemText }} />
            </ListItem>
          </List>
        </Collapse>

        <ListItem component={Link} to="/cart">
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="View Cart" classes={{ primary: classes.listItemText }} />
        </ListItem>

        <ListItem component={Link} to="/PlacedOrders" className={classes.nested}>
              <ListItemIcon>
                <DescriptionIcon />
              </ListItemIcon>
              <ListItemText primary="Placed Orders" classes={{ primary: classes.listItemText }} />
            </ListItem>

        <ListItem component={Link} to="/contactUs">
          <ListItemIcon>
            <ContactMailIcon />
          </ListItemIcon>
          <ListItemText primary="Contact" classes={{ primary: classes.listItemText }} />
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
            <ListItem component={Link} to="/ProductReport" className={classes.nested}>
              <ListItemIcon>
                <DescriptionIcon />
              </ListItemIcon>
              <ListItemText primary="Product Report" classes={{ primary: classes.listItemText }} />
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
