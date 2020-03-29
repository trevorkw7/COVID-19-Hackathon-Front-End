import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

export default function LocationButton() {
    
    const classes = useStyles();
   
    return (
        <div className={classes.root}>
            <IconButton aria-label='get-location' color="secondary">
                <LocationOnIcon />
            </IconButton>
        </div>
    );
}