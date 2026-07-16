import { useAuth } from "../context/AuthContext";

export default function UserProfile() {
  const { currentUser, role } = useAuth();

  return (
    <div className="page-card">
      <h2>User Profile</h2>
      <p>This page is protected: it requires only that you're logged in.</p>
      <ul>
        <li>
          <strong>Email:</strong> {currentUser.email}
        </li>
        <li>
          <strong>UID:</strong> {currentUser.uid}
        </li>
        <li>
          <strong>Role:</strong> {role}
        </li>
      </ul>
    </div>
  );
}
