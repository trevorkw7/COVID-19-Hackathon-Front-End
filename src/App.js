import React, { useState} from 'react';
import './App.css';
import TopBar from './components/TopBar.js';
import LocationButton from './components/LocationButton.js';
import Center from 'react-center';
import Table from './components/Table.js';
import { Helmet } from 'react-helmet'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
      width: '100%',
      
      backgroundColor: theme.palette.background.paper,
  },
}));

function App() {

  const [loading, setLoading] = useState(false);
  //contains all data
  const [apiData, setApiData] = useState(null);
  const [result, setResult] = useState(" ");
  //contains table data
  const [sentApi, setSentApi] = useState(null);

  function handleChildClick(latitude, longitude) {
    setLoading(true);
    fetchData(latitude, longitude).then((file) =>
      setApiData(file))
    fetchData(latitude, longitude).then((file) =>
      setSentApi(file))
  }


  async function fetchData(latitude, longitude) {
    const url = 'https://corona-19-hackathon.herokuapp.com/location/stats?lat=' + latitude + '&lng=' + longitude;
    // const url = 'https://corona-19-hackathon.herokuapp.com/location/stats?lat=40.712&lng=-122.1684';
    const response = await fetch(url);
    return await response.json();

  }
  
  function renderInstructiions(){
    if (apiData['Stay Home'])
      return(['Yes', '(Order Issued)'])
    else {
    setResult('Advised', null);
    }
  }

  const classes = useStyles();
  return (
    <div className="App">
      <Helmet>
        <style>{'body { background-color: #F5F5F5 }'}</style>
      </Helmet>
      <TopBar className='bar' />
      <Center>
        <Paper>
          <Typography variant='h4' color='inherit' align='center'>
            Should I social distance myself?
          </Typography>
          
          {apiData != null ? <div className={classes.root}>
            <React.Fragment><Typography variant='h2' color='inherit' align='center'>
            {renderInstructiions()[0]}
          </Typography>
          <Typography variant='body1' color='inherit' align='center'>
            {renderInstructiions()[1]}
          </Typography> </React.Fragment> </div>: null}


        </Paper>
      </Center>
      <Center>
        <LocationButton className='location-button' onChildClick={handleChildClick} />
        {/* {error ? "server-error" : null} */}
      </Center>
      <Center>
        {sentApi != null ? <Table className='table' data={sentApi} /> : null}
      </Center>
    </div>
  );
}

export default App;
