import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const UserRoute = () => {
    const { user, loading } = useAuth();
    if (loading) return <p>Loading...</p>;
    return user ? <Outlet /> : <Navigate to="/login" />;
};

export const AdminRoute = () => {
    const { user, role, loading } = useAuth();
    if (loading) return <p>Loading...</p>;
    return user && role === 'admin' ? <Outlet /> : <Navigate to="/" />;
};