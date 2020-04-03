import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
// import Link from '@material-ui/core/Link';
import HideOnScroll from "./HideOnScroll.js";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 0
  },
  bottomBar: {
    top: "auto",
    bottom: 0
  },
  listItem: {
    marginRight: "10px"
  }
}));

export default function BottomBar(props) {
  const classes = useStyles();

  return (
    <HideOnScroll direction="up" {...props}>
      <AppBar className={classes.bottomBar} position="fixed" color="primary">
        <Toolbar variant="dense">
          <Typography
            className={classes.listItem}
            variant="body1"
            color="inherit"
          >
            <b>*Disclaimer: </b> The displayed assessment is to be paired with
            your personal judgement. Any action taken upon with the information
            on this site is strictly at your own risk.
          </Typography>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
}
