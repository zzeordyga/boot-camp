const Profile = ({ user }) => {
  return (
    <div className="page-container">
      <h2>User Profile</h2>
      <p>Email: {user.email}</p>
      <p>Welcome, regular user!</p>
    </div>
  );
};

export default Profile;
