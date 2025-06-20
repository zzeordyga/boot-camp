import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style.css';
// import './views/2501981560/index.css';
// import Index
import { BrowserRouter, Route, Routes } from 'react-router';
import Index from './views/2501981560/AvePage';


ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Index/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);