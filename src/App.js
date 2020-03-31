import React, { useState, useEffect } from 'react';
import './App.css';
import TopBar from './components/TopBar.js';
import LocationButton from './components/LocationButton.js';
import SearchLocation from './components/SearchLocation.js';
import Center from 'react-center';
import Table from './components/Table.js';
import { Helmet } from 'react-helmet'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ReactLoading from 'react-loading';
import AutoCompleteSearch from './components/AutoCompleteSearch.js'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLang,
  getLatLng,
} from 'react-places-autocomplete';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 'auto',
    height: 'auto',
    // padding: '10px, 10px, 10px, 10px',
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
    fetchData(latitude, longitude).then((file) =>
      setApiData(file))
    fetchData(latitude, longitude).then((file) =>
      setSentApi(file)).then(setLoading(false));
  }

  function isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) !== null;
  }

  function handleAddressClick(location) {
    geocodeByAddress(location).then((loc_data) => getLatLng(loc_data[0]).then((latLng) => 
    {
      fetchData(latLng['lat'], latLng['lng']).then((file) =>
      setApiData(file))
      fetchData(latLng['lat'], latLng['lng']).then((file) =>
      setSentApi(file)).then(setLoading(false));
    }))
    
  } 

  async function fetchStringData(location) {
    const url = "https://corona-19-hackathon.herokuapp.com/reverse/stats?loc=" + location;
    const response = await fetch(url);
    return await response.json();
  }

  useEffect(() => { setLoading(true) }, [apiData]);


  async function fetchData(latitude, longitude) {
    const url = 'https://corona-19-hackathon.herokuapp.com/location/stats?lat=' + latitude + '&lng=' + longitude;
    // const url = 'https://corona-19-hackathon.herokuapp.com/location/stats?lat=40.712&lng=-122.1684';
    const response = await fetch(url);
    return await response.json();

  }

  function renderInstructiions() {
    var temp = []
    if(apiData['Safe Score'] > 75 && !apiData['Stay Home']){
      temp[0] = 'Advised'
    }
    else{
      temp[0] = 'Yes'
    }
    temp[1] = apiData['Stay Home'] ? '(Gov\'t Order Issued)' : '(No Gov\'t order issued)'

    return temp
    // if (apiData['Safe Score'] <= 75 && apiData['Stay Home']) {
    //   return (['Yes', '(Order Issued)'])
    // }
    // else if (apiData['Safe Score'] <= 50 && !apiData['Stay Home'] ) {
    //   return ['Yes', '(No order issued)'];
    // }
    // else if (apiData['Safe Score'] <= 75) {
    //   return['Advised', null]
    // }
    // else {
    //   return['No', null]
    // }
  }

  const classes = useStyles();
  return (
    <div className="App">
      <Helmet>
        <style>{'body { background-color: #F5F5F5 }'}</style>
      </Helmet>
      <TopBar className='bar' />
      <Center style={{ paddingTop: '20px' }}>
        <Paper elevation={3} style={{ padding: 20 }} >
          <Typography variant='h4' color='inherit' align='center' >
            Should I social distance myself?
          </Typography>

          {apiData != null ? <div className={classes.root}>
            <React.Fragment><Typography variant='h2' color='inherit' align='center'>
              {renderInstructiions()[0]}
            </Typography>
              <Typography variant='body1' color='inherit' align='center'>
                {renderInstructiions()[1]}
              </Typography> </React.Fragment> </div> : null}

        </Paper>

      </Center>
      <Center>
        <LocationButton className={classes.locationButton} onChildClick={handleChildClick} />
        <Typography color='inherit' style={{paddingRight: '40px'}}> OR </Typography>
        <AutoCompleteSearch className={classes.searchButton} onChildClick={handleAddressClick}></AutoCompleteSearch>
      </Center>

      {loading ? null : <div> <Center><ReactLoading type="spin" color='#5fb4ed' height={100} width={100} /></Center>
        <Center><Typography variant='body1'>Make sure your location is on!</Typography> </Center> </div>}
        
        <Center>
          {sentApi != null ? <Typography>Your County: {apiData['County']} </Typography> : null}
        </Center>
        
      <Center>
        {sentApi != null ? <Table className='table' data={sentApi} /> : null}
      </Center>
    </div>
  );
}

export default App;
