import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import HideOnScroll from './HideOnScroll.js'
import GitHubIcon from '@material-ui/icons/GitHub';
import IconButton from '@material-ui/core/IconButton';

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
      <HideOnScroll {...props} direction='down'>
      <AppBar className={classes.topBar} position="fixed" color='primary'>
        <Toolbar variant="dense">
          <Typography variant="h5" color="inherit">
            Safe Score (USA Only)
          </Typography>
          <IconButton className={classes.listItem} style={{paddingLeft: 'auto', position: 'absolute', right: '0px', top: '0px', color:'white'}} target='blank' href="https://github.com/trevorkw7/COVID-19-Hackathon-Front-End">
        <GitHubIcon style={{color:'white'}}/>
        </IconButton>
        </Toolbar>
      </AppBar>
      </HideOnScroll>
  );
}