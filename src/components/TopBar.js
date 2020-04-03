import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import HideOnScroll from './HideOnScroll.js'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 0,
  },
  topBar:{
    top: 0,
    bottom: "auto",
  }
}));

export default function TopBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <HideOnScroll {...props} direction='down'>
      <AppBar className={classes.topBar} position="fixed" color='primary'>
        <Toolbar variant="dense">
          <Typography variant="h5" color="inherit">
            Safe Score (USA Only)
          </Typography>
        </Toolbar>
      </AppBar>
      </HideOnScroll>
    </div>
  );
}