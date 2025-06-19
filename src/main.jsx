import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style.css';
import './tailwind.css';
import { BrowserRouter, Route, Routes } from 'react-router';


ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);