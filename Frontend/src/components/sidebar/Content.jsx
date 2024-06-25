import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@mui/styles';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

function SimpleList(props) {
  const { classes } = props;

  return (
    <div className={classes.root} style={{ width: 300 }}>
      
    </div>
  );
}

SimpleList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleList);
