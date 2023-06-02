import React, { useState, useEffect, useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import moment from 'moment'
function App() {
  const [currentTime, setCurrentTime] = useState(0);
  const [flag, setflag] = useState(false);
  const [count, setcount] = useState(0);
  const [out, setout] = useState(false);
  const intervalRef = useRef();
  useEffect(() => {
    setInterval(() => {
      // console.log('时间');
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
      // console.log(time);
      setCurrentTime(time)
    });
  }
  // 关闭
  const stopatime = () => {
    clearInterval(intervalRef.current);
  }
  const startatime = () => {
    intervalRef.current = setInterval(async () => {
      if (count < 20) {
        setcount((count) => {
          console.log('count', count + 1)
          return count + 1
        })
      } else {
        console.log('进度条20%')
      }
    }, 1000);
  }
  const handleBtn = () => {
    if (!flag) {
      setflag(true)
      startatime(); // 开启定时器

    } else {
      console.log('点击终止导入');
      setout(true)
      stopatime()
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={handleBtn}>{flag ? '终止导入' : '导入'}</button>
        <button>{count}</button>
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
