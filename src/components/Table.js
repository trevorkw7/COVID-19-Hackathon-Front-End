import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
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


var colorScale = scaleLinear().domain([0, 50, 100]).range(["#ff2626", "#ffa719", "#5bff2e"]);
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

const criteriaDescription = ["Description: Total Active Cases in County. Calculation: (Total Cases - Recoveries - Deaths).  Source: John Hopkins CSSE."
  , "Description: Deaths % increase over 5 day period. Calculation: 20 * (Deaths Today - Death 5 Days Ago). Source: John Hopkins CSSE.",
  "Description: Total deaths in county due to COVID-19. Source: John Hopkins CSSE.",
  "Description: Population count in county of people 65 and older. Source: US Census Bureau - 2011.",
  "Description: Infections % increase over 5 day period. Calculation: 20 * (Infections today - Infections 5 Days ago). Source: John Hopkins CSSE.",
  "Description: People per square mile in county. Source US Census Bureau - 2011.",
  "Description: Cumulative index used to determine location safety based on the following factors: Active Cases, Population Density, Infected Rate Growth, Death Rate Growth, Deaths, High-Risk Population. Calculation: Sources: US Census Bureau, John Hopkins Dataset"]

const SimpleTable = (props) => {

  const remove = ['County_Coords', 'County', 'Land Area', 'Population', 'State', 'Stay Home']
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
  const popupState5 = usePopupState({
    variant: 'popover',
    popupId: 'demoPopover',
  })
  const popupState6 = usePopupState({
    variant: 'popover',
    popupId: 'demoPopover',
  })
  const popupState7 = usePopupState({
    variant: 'popover',
    popupId: 'demoPopover',
  })

  function getTrueCaption(caption){
    switch(caption){
      case 'High Risk Population': return 'Percent High Risk';
      case 'Death Rate Growth' : return '5-Day Death Rate Growth';
      case 'Infected Rate Growth': return '5-Day Infected Rate Growth';
      case 'Deaths' : return 'Total Deaths'
      default: return caption;
    }
  }


  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
          <TableRow>
            <TableCell align="right" style={{ maxWidth: '10px' }} />
            <TableCell align="center">
              Criteria
              </TableCell>
              <TableCell align="center">Result</TableCell>
              </TableRow>
          </TableHead>
          <TableBody>

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
                      <Box width='auto'>
                        <Typography variant=
                          'body2'>
                          {criteriaDescription[index]}
                        </Typography>
                      </Box>

                    </Popover>
                    {getTrueCaption(caption[0])}
                  </TableCell>
                  <TableCell align="center" className={classes.cell} key={caption[1]}>
                    <Typography style={{ color: caption[0] === 'Safe Score' ? colorScale(data["Safe Score"]) : 'inherit' }}>
                      {caption[0] === 'Safe Score' ? caption[1] + ' / 100 ' : caption[1]}
                      {caption[0] === 'High Risk Population' ? '%' : null}
                      {caption[0] === 'Infected Rate Growth' ? '%' : null}
                      {caption[0] === 'Death Rate Growth' ? '%' : null}
                    </Typography>
                  </TableCell>
                </TableRow>
            
            </React.Fragment>
          ))}
        </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default SimpleTable;