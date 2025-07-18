"use client";

import Link from "next/link";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

import useAuth from "../_hooks/useAuth";
import getFirebase from "../_libs/firebase";

export default function Header() {
  const { user, role, loading } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { auth } = getFirebase();

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await signOut(auth);
      router.push("/assignment/10/2501995345");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <header className="flex justify-between items-center px-4 py-4 shadow-md fixed top-0 left-0 right-0 z-50 bg-white">
      <Link href="/assignment/10/2501995345">
        <h1 className="text-xl font-bold text-blue-500">Assignment 10</h1>
      </Link>

      <div className="flex flex-row items-center gap-2">
        {user && !loading && role === "ADMIN" && (
          <Link
            href="/assignment/10/2501995345/admin/dashboard"
            className="px-3 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-400 active:bg-blue-600 transition-colors duration-300"
          >
            Admin Dashboard
          </Link>
        )}
        {user && !loading && (
          <Link
            href="/assignment/10/2501995345/user/profile"
            className="px-3 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-400 active:bg-blue-600 transition-colors duration-300"
          >
            Profile
          </Link>
        )}
        {user && !loading && (
          <button
            onClick={handleLogout}
            disabled={isLoading}
            className="px-3 py-2 rounded-md bg-red-500 text-white hover:bg-red-400 active:bg-red-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading ? "Logging out..." : "Logout"}
          </button>
        )}
      </div>
    </header>
  );
}
