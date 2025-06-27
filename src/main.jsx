import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style.css';
import Putra from './views/2502006726/index';
import { BrowserRouter, Route, Routes } from 'react-router';


ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}/>
        <Route path='/2502006726' element={<Putra/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);