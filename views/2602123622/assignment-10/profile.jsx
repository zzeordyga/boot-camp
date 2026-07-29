"use client";

import { useAuth } from "./authContext";
import styles from "./styles.module.css";

export default function ProfilePage() {
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

  return (
    <div className={styles.container}>
      <div className={styles.profileCard}>
        <h2>User Profile</h2>
        <div className={styles.profileInfo}>
          <p>
            <strong>Name:</strong> {user.displayName || "N/A"}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>User ID:</strong> {user.uid}
          </p>
          <p>
            <strong>Role:</strong>{" "}
            <span className={`${styles.roleBadge} ${styles[role] || ""}`}>
              {role || "user"}
            </span>
          </p>
          <p>
            <strong>Email Verified:</strong> {user.emailVerified ? "Yes" : "No"}
          </p>
        </div>
      </div>
    </div>
  );
}
