// src/components/Navbar.js
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { auth, db } from "@/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      if (u) {
        setUser(u);

        // Ambil role dari Firestore
        try {
          const userDoc = await getDoc(doc(db, "users", u.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setUserRole(data.role);
          }
        } catch (err) {
          console.error("Gagal ambil role user:", err.message);
        }
      } else {
        setUser(null);
        setUserRole(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    alert("Logout berhasil");
    window.location.href = "/2440068423/login";
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow">
      <div className="font-bold text-lg">
        <Link href="/2440068423/posts">My Firebase App</Link>
      </div>

      <div className="flex items-center gap-4">
        {!user && (
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
        )}

        {user && (
          <>
            <Link
              href="/2440068423/user/profile"
              className={pathname === "/2440068423/user/profile" ? "underline" : ""}
            >
              Profile
            </Link>

            {/* Tampilkan dashboard hanya jika admin */}
            {userRole === "admin" && (
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
