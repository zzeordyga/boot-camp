"use client";

import { AuthProvider } from "../../../../views/2602123622/assignment-10/authContext";
import { useAuth } from "../../../../views/2602123622/assignment-10/authContext";
import { useRouter } from "next/navigation";
import styles from "../../../../views/2602123622/assignment-10/styles.module.css";

function LayoutContent({ children }) {
  const { user, role, loading, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/2602123622/assignment-10/login");
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.spinner} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.headerTitle}>Firebase Auth App</h1>

          <nav className={styles.nav}>
            <a href="/2602123622/assignment-10">Home</a>
            {user && (
              <>
                <a href="/2602123622/assignment-10/profile">Profile</a>
                {role === "admin" && (
                  <a href="/2602123622/assignment-10/admin/dashboard">Admin</a>
                )}
              </>
            )}
            {!user && (
              <>
                <a href="/2602123622/assignment-10/login">Login</a>
                <a href="/2602123622/assignment-10/register">Register</a>
              </>
            )}
            {user && <button onClick={handleLogout}>Logout</button>}
          </nav>
        </div>
      </header>

      <main className={styles.main}>{children}</main>

      {/* <footer className={styles.footer}>
        &copy; 2026 Firebase Auth App &mdash; 2602123622
      </footer> */}
    </div>
  );
}

export default function Assignment10Layout({ children }) {
  return (
    <AuthProvider>
      <LayoutContent>{children}</LayoutContent>
    </AuthProvider>
  );
}
