import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

  // import Rental frpm './contracts/RentableObjects.json'


const styles = {
  root: {
    flexGrow: 1,
  },

  appbar: {
    alignItems: 'center',
    height:100,
  },

  title: {
    padding:50,
    fontSize: '2rem',
  },

};

function SimpleAppBar(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar variant="dense" color='#1e88e5' container>
          <Typography variant="h5" color="inherit" className={classes.title}>
            Rental Services
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

SimpleAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleAppBar);

