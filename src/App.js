import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [currentTime, setCurrentTime] = useState(0);
  useEffect(() => {
    getTime()
  }, []);
  const getTime = async () => {
    const response = await fetch('/time');
    if (!response.ok) {
      throw new Error(response.status);
    }
    const res = response.json();
    console.log(res);
    res.then(data => setCurrentTime(data.time));
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>Current Time: {currentTime}</p>
      </header>
    </div>
  );
}

export default App;
