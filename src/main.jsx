import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ZiggyApp from './views/2101702761';
import './style.css';
import './tailwind.css';
import { BrowserRouter, Route, Routes } from 'react-router';


ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}/>
        <Route path='/2101702761' element={<ZiggyApp/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);