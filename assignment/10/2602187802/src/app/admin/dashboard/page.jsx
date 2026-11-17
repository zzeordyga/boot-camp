"use client";

import RouteGuard from "../../../components/RouteGuard";
import LogoutButton from "../../../components/LogoutButton";
import { useAuth } from "../../../context/AuthContext";

function DashboardContent() {
  const { user, username } = useAuth();

  return (
    <main className="page-container">
      <section className="card">
        <h1>Admin Dashboard</h1>
        <div className="info-list">
          <p>
            <strong>Username:</strong> {username || "-"}
          </p>
          <p>
            <strong>Admin:</strong> {user?.email}
          </p>
        </div>
        <LogoutButton />
      </section>
    </main>
  );
}

export default function DashboardPage() {
  return (
    <RouteGuard allowedRoles={["admin"]}>
      <DashboardContent />
    </RouteGuard>
  );
}
