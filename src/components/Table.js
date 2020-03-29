import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 20,
  },
});

const SimpleTable = (props) => {

  const remove = ['County_Coords', 'County', 'Deaths', 'Infected_Rate_Growth', 'Land_Area', 'Population','State']
  let data = props.data;
 
  for(var i=0; i<remove.length; i++){
    delete data[remove[i]]
  }
  
  let entries = Object.entries(data);

  const classes = useStyles();
  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            
              <TableCell align="center">Criteria</TableCell>
              <TableCell align="center">Result</TableCell>
              {entries.map((caption, index) => (
                <React.Fragment>
                  <TableRow>
                <TableCell align="center" key={caption[0]}>{caption[0]}</TableCell>
                <TableCell align="center" key={caption[1]}>{caption[1]}</TableCell>
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