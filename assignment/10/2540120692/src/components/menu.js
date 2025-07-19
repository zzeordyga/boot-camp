"use client";
import getConfig from "@/firebase/config";
import { useAuthGuard } from "@/hooks/useAuthGuards";
import { signOut } from "firebase/auth";
import Link from "next/link";

export default function Menu() {
  const { role } = useAuthGuard();
  const isLoggedIn = role === "user" || role === "admin";

  const handleLogOut = async () => {
    await signOut(getConfig().auth)
  }

  return (
    <nav className="menu">
      <div className="list-menu-item">
        {role === "user" && (
          <>
            <Link href="/" className="menu-item">
              Home
            </Link>
            <Link href="/users" className="menu-item">
              Users
            </Link>
            <Link href="/foods" className="menu-item">
              Foods
            </Link>
            <Link href="/user/profile" className="menu-item">
              Profile
            </Link>
          </>
        )}
        {role === "admin" && (
          <>
            <Link href="/" className="menu-item">
              Home
            </Link>
            <Link href="/users" className="menu-item">
              Users
            </Link>
            <Link href="/foods" className="menu-item">
              Foods
            </Link>
            <Link href="/admin/dashboard" className="menu-item">
              Dashboard
            </Link>
          </>
        )}
      </div>
      {role === "guest" && (
        <div className="list-menu-item">
          <Link href="/login" className="menu-item">
            Login
          </Link>
        </div>
      )}
      {isLoggedIn && (
        <div className="list-menu-item">
          <div className="menu-item" onClick={handleLogOut}>
            Log Out
          </div>
        </div>
      )}

    </nav>
  );
}