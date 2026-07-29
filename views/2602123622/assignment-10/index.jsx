"use client";

import { useAuth } from "./authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "./styles.module.css";

export default function HomePage() {
  const { user, role, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        if (role === "admin") {
          router.push("/2602123622/assignment-10/admin/dashboard");
        } else {
          router.push("/2602123622/assignment-10/profile");
        }
      } else {
        router.push("/2602123622/assignment-10/login");
      }
    }
  }, [user, role, loading, router]);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.spinner} />
      </div>
    );
  }

  return null;
}
