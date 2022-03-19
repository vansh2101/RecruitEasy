import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter , Route,  Routes } from 'react-router-dom';
import './index.css';

//pages
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Create from './pages/Create';
import Interview from './pages/Interview';

ReactDOM.render(
  <React.StrictMode>

    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Home />} />
        <Route path='/create' element={<Create />} />
        <Route path='/interview' element={<Interview />} />
      </Routes>
    </BrowserRouter>
    
  </React.StrictMode>,

  document.getElementById('root')
);
