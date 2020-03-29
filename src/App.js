import React from 'react';
import './App.css';

import TopBar from './components/TopBar.js';
import LocationButton from './components/LocationButton.js';
import Center from 'react-center';
import InstructionText from './components/InstructionText.js';
import Table from './components/Table.js';

function App() {
  return (
    <div className="App">
      <TopBar />
      <Center>
        <InstructionText />
      </Center>
      <Center>
        <LocationButton />
      </Center>
      <Table />
    </div>
  );
}

export default App;
