// src/components/LogoutButton.js
"use client";

import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
    >
      Logout
    </button>
  );
}
