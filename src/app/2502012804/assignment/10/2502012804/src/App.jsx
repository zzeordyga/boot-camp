import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';
import { UserRoute, AdminRoute } from './components/ProtectedRoutes.jsx';
import './App.css';

const HomePage = () => <h1>Home Page - Public</h1>;
const UserProfile = () => <h1>User Profile - Authenticated Users Only</h1>;
const AdminDashboard = () => <h1>Admin Dashboard - Admins Only</h1>;

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        <Link to="/user/profile">User Profile</Link>
        <Link to="/admin/dashboard">Admin Dashboard</Link>
      </nav>
      
      <hr />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route element={<UserRoute />}>
          <Route path="/user/profile" element={<UserProfile />} />
        </Route>

        <Route element={<AdminRoute />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;