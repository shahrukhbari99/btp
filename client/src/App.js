import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Main from './components/main'

// import Rental frpm './contracts/RentableObjects.json'


const styles = {
  root: {
    flexGrow: 1,
  },

  appbar: {
    alignItems: 'center',
    height:80,
    color: 'primary'
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
        <Toolbar variant="dense" container>
          <Typography variant="h5" color="inherit" className={classes.title}>
            Rental Services
          </Typography>
        </Toolbar>
      </AppBar>
      <Main/>
    </div>
  );
}

SimpleAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleAppBar);

