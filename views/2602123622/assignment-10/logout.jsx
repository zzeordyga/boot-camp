"use client";

import { useEffect, useState } from "react";
import { useAuth } from "./authContext";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";

export default function LogoutPage() {
  const { logout } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await logout();
      } catch (err) {
        console.error("Logout error:", err);
      } finally {
        setLoading(false);
        router.push("/2602123622/assignment-10/login");
      }
    };

    handleLogout();
  }, [logout, router]);

  return (
    <div className={styles.container}>
      <div className={styles.protectedMessage}>
        <div className={styles.spinner} />
        <p>Signing you out...</p>
      </div>
    </div>
  );
}
