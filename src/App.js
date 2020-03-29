import React, { useState, useEffect } from 'react';
import './App.css';
import TopBar from './components/TopBar.js';
import LocationButton from './components/LocationButton.js';
import Center from 'react-center';
import InstructionText from './components/InstructionText.js';
import Table from './components/Table.js';

function App() {

  let json; 
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [result, setResult] = useState(null);

  function handleChildClick(latitude, longitude) {
    setLoading(true);
    fetchData(latitude, longitude).then((file) => setApiData(file));
  }


  async function fetchData(latitude, longitude) {
    const url = 'http://corona-19-hackathon.herokuapp.com/location/stats?lat=' + latitude + '&lng=' + longitude;
      const response = await fetch(url);
      setLoading(false);
      return await response.json(); 
  }
  
  useEffect(() => {
    if(apiData!= null){
      console.log(apiData['Stay_Home'])
      if(apiData["Stay_Home"]){
        setResult('Yes')
      }
      else{
        setResult('Advised')
      }
    }
  })



  return (
    <div className="App">
      <TopBar className='bar' />
      <Center>
        <InstructionText className='instruction-text' result={result} />
      </Center>
      <Center>
        <LocationButton className='location-button' onChildClick={handleChildClick} />
        {error ? "server-error" : null}
      </Center>
      {apiData!=null ? <Table className='table' data={apiData} /> : null}
    </div>
  );
}

export default App;
