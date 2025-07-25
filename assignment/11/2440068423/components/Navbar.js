"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { useAuth } from "@/context/AuthContext"; // Ambil dari context

export default function Navbar() {
  const pathname = usePathname();
  const { user, userData, loading } = useAuth(); // Pakai context

  const handleLogout = async () => {
    await signOut(auth);
    alert("Logout berhasil");
    window.location.assign("/2440068423/login");
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow">
      <div className="font-bold text-lg">
        <Link href="/2440068423/posts">My Firebase App</Link>
      </div>

      <div className="flex items-center gap-4">
        {loading ? (
          <span className="text-sm italic text-gray-400">Memuat...</span>
        ) : !user ? (
          <>
            <Link
              href="/2440068423/login"
              className={pathname === "/2440068423/login" ? "underline" : ""}
            >
              Login
            </Link>
            <Link
              href="/2440068423/register"
              className={pathname === "/2440068423/register" ? "underline" : ""}
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/2440068423/user/profile"
              className={pathname === "/2440068423/user/profile" ? "underline" : ""}
            >
              Profile
            </Link>

            {userData?.role === "admin" && (
              <Link
                href="/2440068423/admin/dashboard"
                className={pathname === "/2440068423/admin/dashboard" ? "underline" : ""}
              >
                Dashboard
              </Link>
            )}

            <span className="text-sm text-gray-400 hidden md:inline">
              {user.email}
            </span>

            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
