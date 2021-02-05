import './App.css';
import React from 'react';
import AppNavbar from './components/AppNavbar';
import Map from './components/Map';
import SiteList from './components/SiteList';

const App = () => {
  return (
    <div className="App">
      <AppNavbar />
      <Map />
      <SiteList />
    </div>
  );
};

export default App;
