//DEPRICATED NOT IN USE
import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 500,
        
        backgroundColor: theme.palette.background.paper,
    },
}));

//add variable with result to replace var
export default function InstructionText(props) {
    const classes = useStyles();

    const [profileState, setProfileState] = useState(props)

    return (
        <div className={classes.root}>
            
        </div>
    )

}