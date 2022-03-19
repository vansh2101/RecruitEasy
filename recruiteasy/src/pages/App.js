import React, {useEffect} from 'react'
import logo from './logo.svg';
import '../styles/App.css';
import {get, post} from '../scripts/requests';

function App() {

  /*
  useEffect(() => {
    (async() => {
      const res = await get('http://localhost:8000/api/interview/', 'fd27480f170d12e5f620444197aaf9d2f18f4eca')
      console.log(res)
    })()
  }, [])
  */

  /*
  useEffect(() => {
    (async() => {
      const res = await post('http://localhost:8000/api-token-auth/', null, {username: 'vansh', password: 'vansh123'})
      console.log(res)
    })()
  }, [])
  */

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
        </a>
      </header>
    </div>
  );
}

export default App;
