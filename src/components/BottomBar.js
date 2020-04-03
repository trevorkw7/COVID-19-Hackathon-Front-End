import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import Link from '@material-ui/core/Link';
import GitHubIcon from '@material-ui/icons/GitHub';
import IconButton from '@material-ui/core/IconButton';
import HideOnScroll from './HideOnScroll.js'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 0,
  },
  bottomBar:{
    top: 'auto',
    bottom: 0,
  },
  listItem:{
      marginRight: '10px'
  }
}));



export default function BottomBar(props) {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <HideOnScroll direction='up' {...props}>
      <AppBar className={classes.bottomBar}  position="fixed" color='primary'>
        <Toolbar variant="dense" >
            <IconButton className={classes.listItem} style={{color:'white'}} target='blank' href="https://github.com/trevorkw7/COVID-19-Hackathon-Front-End">
        <GitHubIcon style={{color:'white'}}/>
        </IconButton>
          <Typography className={classes.listItem} variant="body1" color="inherit">
            <b>*Disclaimer: </b>  The displayed assessment is meant to be paired with your personal judgement. Any action you take upon the information on this website is strictly at your own risk.
          </Typography>
        </Toolbar>
      </AppBar>
      </HideOnScroll>
    </div>
  );
}