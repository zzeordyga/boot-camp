"use client";

import { useAuth } from "./authContext";
import styles from "./styles.module.css";

export default function AdminDashboard() {
  const { user, role, loading } = useAuth();

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.spinner} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className={styles.container}>
        <div className={styles.protectedMessage}>
          <h2>Access Denied</h2>
          <p>You must be logged in to view this page.</p>
        </div>
      </div>
    );
  }

  if (role !== "admin") {
    return (
      <div className={styles.container}>
        <div className={styles.protectedMessage}>
          <h2>Forbidden</h2>
          <p>You do not have permission to access the admin dashboard.</p>
          <p>Only users with the admin role can access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.adminDashboard}>
        <h2>Admin Dashboard</h2>
        <p style={{ color: "#6b7280", marginBottom: "20px" }}>
          Welcome, <strong>{user.email}</strong>. You have admin privileges.
        </p>

        <div className={styles.adminCard}>
          <h3>User Management</h3>
          <p>Manage user accounts, roles, and permissions from this section.</p>
        </div>

        <div className={styles.adminCard}>
          <h3>System Settings</h3>
          <p>Configure application settings and Firebase rules.</p>
        </div>

        <div className={styles.adminCard}>
          <h3>Analytics</h3>
          <p>View application usage statistics and reports.</p>
        </div>

        <div className={styles.adminCard}>
          <h3>Security</h3>
          <p>Monitor authentication events and security logs.</p>
        </div>
      </div>
    </div>
  );
}
