import { auth } from "../firebase";

export default function UserProfile() {
  return (
    <div>
      <h2>User Profile</h2>
      <p>Email: {auth.currentUser?.email}</p>
    </div>
  );
}
