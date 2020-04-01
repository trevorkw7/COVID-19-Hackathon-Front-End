//Depricated

import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    iconButton: {
        padding: 10,
      },
}));

export default function SearchLocation({ onChildClick }) {
    const classes = useStyles();
    const [title, setTitle] = useState('')
    function click(){
        onChildClick(title);
    }
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          click()
        }
      }
    return (
        <div className={classes.root}>
            <div id="container">
                <div className="item">
                   <TextField variant="outlined" onKeyDown={handleKeyDown} onChange={event => setTitle(event.target.value)} label="Enter Location"/>
                   {/* <IconButton aria-label="search" onClick={click} >
        <SearchIcon />
      </IconButton> */}
                </div>
            </div>
        </div>
    );
}

