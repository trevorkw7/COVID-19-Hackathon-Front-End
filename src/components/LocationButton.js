import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(20),
        },
    },
}));



export default function LocationButton({onChildClick}) {

    const classes = useStyles();

    function getLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(setPosition);
        } else {
           console.log("Geolocation is not supported by this browser.");
        }
      }
      
    async function setPosition(position) {
        console.log(position.coords.latitude, position.coords.longitude)
        await onChildClick(position.coords.latitude, position.coords.longitude)
    }

    return (
        <div className={classes.root}>
            <IconButton aria-label='get-location' color="secondary" onClick={getLocation}>
                <LocationOnIcon style={{fontSize: 100}} />
            </IconButton>
        </div>
    );
}