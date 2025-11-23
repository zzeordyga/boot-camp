const AdminDashboard = ({ user }) => {
  return (
    <div className="page-container">
      <h2>Admin Dashboard</h2>
      <p>Email: {user.email}</p>
      <p>You have admin privileges.</p>
    </div>
  );
};

export default AdminDashboard;
