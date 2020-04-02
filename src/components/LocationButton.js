import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Typography from '@material-ui/core/Typography'


const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));



export default function LocationButton({ onChildClick }) {

    const classes = useStyles();

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(setPosition);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    async function setPosition(position) {
        console.log(position.coords.latitude, position.coords.longitude)
        await onChildClick(position.coords.latitude, position.coords.longitude)
    }

    return (
        <div className={classes.root}>
            <div id="container" align="center">
                <div className="item">
                    <IconButton style={{ marginBottom: '-10px' }} aria-label='get-location' color="secondary" onClick={getLocation}>
                        <LocationOnIcon style={{ fontSize: 80 }} />
                    </IconButton>
                </div>
                <Typography variant="h6" color="secondary">
                    Click me!
                </Typography>
                <div className="circle"></div>
            </div>
        </div>
    );
}