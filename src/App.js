import React, { Component } from 'react';
import Header from './components/header';
import Contents from './components/content';
import * as Fetch from './components/Fetch';
import './App.css';

class App extends Component {

  render() {
    Fetch.loadScript();// To Fetch The APIs (Google MAP & FourSquare Api)
    return (
      <div className="App">
        <Header/>
        <Contents />
      </div>
    );
  }
}

export default App;
