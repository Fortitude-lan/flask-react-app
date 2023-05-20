import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import moment from 'moment'
function App() {
  const [currentTime, setCurrentTime] = useState(0);
  useEffect(() => {
    setInterval(() => {
      console.log('时间');
      getTime()
    }, 200);
  }, []);
  const getTime = async () => {
    const response = await fetch('/time');
    if (!response.ok) {
      throw new Error(response.status);
    }
    const res = response.json();
    // console.log(res);
    res.then(data => {
      let time = moment(data.time).format('YYYY-MM-DD HH:mm:ss')
      console.log(time);
      setCurrentTime(time)
    });
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
