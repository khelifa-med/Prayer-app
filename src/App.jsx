import logo from './logo.svg';
import './App.css';
import * as React from 'react';
import SideBar from './Compoments/SideBarTimes';
import PrayerApp from './Compoments/PrayerApp';

import { Container } from '@mui/material';

function App() {
  return (
    <div 
      className="App" style={
        {
          backgroundColor:'rgb(187, 190, 190)',
          height:'100vh',
          display:'flex',
          justifyContent:'center',
          alignItems:'center',
          flexDirection:'column'
        }
      }
    >

      <Container maxWidth='xl'>
        <PrayerApp/>
      </Container>
          
    </div>
  );
}

export default App;
