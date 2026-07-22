'use client'

import getConfig from "@/firebase/config";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { signOut } from "firebase/auth";
import Link from "next/link";
import React from "react";
import styles from './components.module.css'

export default function Menu() {
const { auth } = getConfig();
  const { role, isAuthenticated } = useAuthGuard();

  const handleLogOut = async () => {
    await signOut(auth)
  }

  return (
    <nav className={`${styles.navigation} ${!isAuthenticated ? styles.hidden : ""}`}>
      <div className={styles.menu}>
        {isAuthenticated && (
          <>
            <Link href={"/"}>Home</Link>
            <Link href={"/profile"}>Profile</Link>
          </>
        )}

        {role === "admin" && <Link href={"/user"}>User</Link>}

        {isAuthenticated && <div className={styles['btn-logout']} onClick={handleLogOut}>Log out</div>}
      </div>
    </nav>
  );
}
