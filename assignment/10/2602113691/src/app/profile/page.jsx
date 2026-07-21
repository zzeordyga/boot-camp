"use client";

import { useAuthGuard } from "@/hooks/useAuthGuard";
import React from "react";
import styles from "./page.module.css";
import Loading from "@/components/loading";

export default function Profile() {
  const { user, loading } = useAuthGuard();

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={styles.page}>
      <div className={styles.main}>
        <h1>Hello {user?.username}!</h1>
        <p>Email: {user?.email}</p>
        <p>Role: {user?.role}</p>
      </div>
    </div>
  );
}
