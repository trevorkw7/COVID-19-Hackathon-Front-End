import React from 'react';
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
import {
  usePopupState,
  bindTrigger,
  bindPopover,
} from 'material-ui-popup-state/hooks';
import Box from '@material-ui/core/Box';
import { scaleLinear } from 'd3-scale';

var colorScale = scaleLinear().domain([0, 100]).range(["#ff5a36","#ffb042"]);
// function rgbToHex(rgb) {
//   rgb.r
//   return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
// }
const useStyles = makeStyles({
  table: {
    minWidth: "100",
    width: "75vw",
  },
  popover: {
    maxWidth: "300",
    width: "auto",
  },
  cell: {
    padding: 5,
    margin: 5
  }
});

const criteriaDescription = ["By removing deaths and recoveries from total cases, we get \"currently infected cases\" or \"active cases\" (John Hopkins Dataset).", "Multiplier for death rate increase in last 5 days (John Hopkins Dataset). Calculation: (current death rate - death rate 5 days ago / 5).", "Population count in county of people 65 and older (US Census Bureau - 2011).", "People per square mile in county (US Census Bureau - 2011).", "(Higher is Better) Cumulative index used to determine if one should social distance according to the following factors: Active Cases, Population Density, Infected Rate Growth, Death Rate Growth, Deaths, High Risk Population. Sources: US Census Bureau, John Hopkins Dataset"]

const SimpleTable = (props) => {

  const remove = ['County_Coords', 'County', 'Deaths', 'Infected Rate Growth', 'Land Area', 'Population', 'State', 'Stay Home']
  let data = props.data;

  for (var i = 0; i < remove.length; i++) {
    delete data[remove[i]]
  }

  let entries = Object.entries(data);

  const classes = useStyles();

  const popupState0 = usePopupState({
    variant: 'popover',
    popupId: 'demoPopover',
  })
  const popupState1 = usePopupState({
    variant: 'popover',
    popupId: 'demoPopover',
  })
  const popupState2 = usePopupState({
    variant: 'popover',
    popupId: 'demoPopover',
  })
  const popupState3 = usePopupState({
    variant: 'popover',
    popupId: 'demoPopover',
  })
  const popupState4 = usePopupState({
    variant: 'popover',
    popupId: 'demoPopover',
  })


  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableCell align="right" style={{ maxWidth: '10px' }}></TableCell>
            <TableCell align="center">
              Criteria
              </TableCell>
            <TableCell align="center">Result</TableCell>
            {entries.map((caption, index) => (
              <React.Fragment key={caption}>
                <TableRow>
                  <TableCell align="right" style={{ padding: 0, margin: 0, maxWidth: '10px' }}><IconButton {...bindTrigger(eval('popupState' + index))}><InfoIcon /></IconButton></TableCell>
                  <TableCell align="center" key={caption[0]} className={classes.cell}>
                    <Popover
                      {...bindPopover(eval('popupState' + index))}
                      anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'left',
                      }}
                      transformOrigin={{
                        vertical: 'center',
                        horizontal: 'center',
                      }}
                      className={classes.popover}
                    >
                      <Box p={2}>
                        <Typography variant=
                          'body2'>
                          {criteriaDescription[index]}
                        </Typography>
                      </Box>

                    </Popover>
                    {caption[0]}
                  </TableCell>
                  <TableCell align="center" className={classes.cell} key={caption[1]}>
                    <Typography style = {{color:caption[0] == 'Safe Score' ? colorScale(data["Safe Score"]) : 'inherit'}}>
                    {caption[1]}
                    </Typography>
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