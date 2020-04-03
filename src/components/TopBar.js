import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import HideOnScroll from "./HideOnScroll.js";
import GitHubIcon from "@material-ui/icons/GitHub";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import Popover from "@material-ui/core/Popover";
import Box from "@material-ui/core/Box";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import {
  usePopupState,
  bindTrigger,
  bindPopover,
} from "material-ui-popup-state/hooks";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 0,
  },
  topBar: {
    top: 0,
    bottom: "auto",
  },
  popover: {
    maxWidth: "300",
    width: "auto",
  },
}));

export default function TopBar(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const text =
    "The displayed assessment is to be paired with your personal judgement. Any action taken upon with the information on this site is strictly at your own risk.";
  const popupState = usePopupState({
    variant: "popover",
    popupId: "demoPopover",
  });

  return (
    <HideOnScroll {...props} direction="down">
      <AppBar className={classes.topBar} position="fixed" color="primary">
        <Toolbar variant="dense">
          <Typography variant="h5" color="inherit">
            Safe Score (USA Only)
          </Typography>
          <IconButton
            className={classes.listItem}
            style={{
              paddingLeft: "auto",
              position: "absolute",
              right: "0px",
              top: "0px",
              color: "white",
            }}
            ref={anchorRef}
            aria-controls={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
            // target="blank"
            // href="https://github.com/trevorkw7/COVID-19-Hackathon-Front-End"
          >
            <GitHubIcon style={{ color: "white" }} />
          </IconButton>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom",
                }}
              >
                <Paper className={classes.paper}>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList>
                      <MenuItem>
                        <a
                          style={{ textDecoration: "none", color: "black" }}
                          target="blank"
                          href="https://github.com/trevorkw7/COVID-19-Hackathon-Front-End"
                        >
                          Frontend
                        </a>
                      </MenuItem>
                      <MenuItem>
                        <a
                          style={{ textDecoration: "none", color: "black" }}
                          target="blank"
                          href="https://github.com/shreystechtips/Safe-Score-COVID-19-Hackathon"
                        >
                          Backend
                        </a>
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
          <IconButton
            style={{
              paddingLeft: "1vw",
              position: "relative",
              right: "0px",
              top: "0px",
              color: "white",
            }}
            {...bindTrigger(popupState)}
          >
            <InfoIcon />
          </IconButton>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: "center",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "center",
              horizontal: "center",
            }}
            className={classes.popover}
          >
            <Box width="auto" style={{ padding: 5 }}>
              <Typography variant="body2">
                <b>Disclaimer: </b> The displayed assessment is to be paired
                with your personal judgement. Any action taken upon with the
                information on this site is strictly at your own risk.
              </Typography>
            </Box>
          </Popover>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
}
