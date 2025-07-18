import { useEffect, useState } from 'react';
import ProtectedRoute from 'assignment/10/2440075523/components/ProtectedRoute';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  // Fetch admin data here

  return (
    <ProtectedRoute requiredRole="admin">
      <div>
        <h1>Admin Dashboard</h1>
        <p>Welcome to the admin panel</p>
        {/* Display admin-only content */}
      </div>
    </ProtectedRoute>
  );
};

export default AdminDashboard;