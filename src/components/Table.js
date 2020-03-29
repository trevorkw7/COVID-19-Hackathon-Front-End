import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  table: {
    width: 800,
  },
});

const criteriaDescription = ["By removing deaths and recoveries from total cases, we get \"currently infected cases\" or \"active cases\".", "Multiplier for death rate increase in last 5 days. Calculation: (current death rate - death rate 5 days ago)/5", "Culmalative value for Active Cases, Deaths, and Death Rate", "Population Count of people 65 and older (US Census - 2011)", "People per square mile"]

const SimpleTable = (props) => {

  const remove = ['County_Coords', 'County', 'Deaths', 'Infected Rate Growth', 'Land Area', 'Population', 'State', 'Stay Home']
  let data = props.data;

  for (var i = 0; i < remove.length; i++) {
    delete data[remove[i]]
  }

  let entries = Object.entries(data);

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);


  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableCell align="center">
              Criteria
              </TableCell>
            <TableCell align="center">Result</TableCell>
            {entries.map((caption, index) => (
              <React.Fragment key='table-contents'>
                <TableRow>
                  <TableCell align="center" key={caption[0]}>
                    <IconButton onClick={handleClick}><InfoIcon /></IconButton>
                    <Popover
                    id={index}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'center',
                    }}
                    >
                      <Typography variant=
                      'body2'>
                        {criteriaDescription[index]}
                      </Typography>

                    </Popover>
                    {caption[0]}
                  </TableCell>
                  <TableCell align="center" key={caption[1]}>
                    {caption[1]}
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableHead>
        </Table>
      </TableContainer>
    </div>
  );
}

export default SimpleTable;