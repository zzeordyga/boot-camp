"use client";

import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "../lib/firebase";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await signOut(auth);
    router.replace("/login");
  }

  return (
    <button type="button" className="btn-secondary" onClick={handleLogout}>
      Logout
    </button>
  );
}
