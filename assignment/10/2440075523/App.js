import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from 'assignment/10/2440075523/pages/Login.js';
import Register from 'assignment/10/2440075523/pages/Register.js';
import Profile from 'assignment/10/2440075523/pages/Profile.js';
import AdminDashboard from 'assignment/10/2440075523/pages/Admin.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;