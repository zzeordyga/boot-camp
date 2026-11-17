"use client";

import RouteGuard from "../../../components/RouteGuard";
import LogoutButton from "../../../components/LogoutButton";
import { useAuth } from "../../../context/AuthContext";

function ProfileContent() {
  const { user, role, username } = useAuth();

  return (
    <main className="page-container">
      <section className="card">
        <h1>User Profile</h1>
        <div className="info-list">
          <p>
            <strong>Username:</strong> {username || "-"}
          </p>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
          <p>
            <strong>Role:</strong> {role}
          </p>
        </div>
        <LogoutButton />
      </section>
    </main>
  );
}

export default function ProfilePage() {
  return (
    <RouteGuard allowedRoles={["user", "admin"]}>
      <ProfileContent />
    </RouteGuard>
  );
}
