"use client";

import styles from "./page.module.css";
import { useAuthGuard } from "../hooks/useAuthGuard";
import Loading from "@/components/loading";

export default function Home() {
  const { loading } = useAuthGuard();

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={styles.page}>
      <h1>Welcome!</h1>
      <h2>This is the home page</h2>
    </div>
  );
}
