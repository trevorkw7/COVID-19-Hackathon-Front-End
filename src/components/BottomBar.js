import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import GitHubIcon from '@material-ui/icons/GitHub';
import IconButton from '@material-ui/core/IconButton';

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

export default function BottomBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={classes.bottomBar} position="fixed" color='primary'>
        <Toolbar variant="dense" >
            <IconButton className={classes.listItem} style={{color:'white'}}>
        <GitHubIcon style={{color:'white'}}/>
        </IconButton>
          <Typography className={classes.listItem} variant="h6" color="inherit">
            <Link href="https://github.com/trevorkw7/COVID-19-Hackathon-Front-End" target='_blank' style={{color:'white',textDecorationLine: 'underline',}}>
                Frontend
          </Link>
          </Typography>
          <Typography className={classes.listItem} variant="h6" color="inherit">
            <Link href="https://github.com/shreystechtips/Safe-Score-COVID-19-Hackathon" target='_blank' style={{color:'white',textDecorationLine: 'underline'}}>
                Backend
          </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}