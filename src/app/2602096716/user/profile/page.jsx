"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthRole } from "../../useAuthRole";

export default function ProfilePage() {
  const router = useRouter();
  const { user, role, loading } = useAuthRole();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/2602096716/login");
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return <p className="p-6 text-gray-500">Memeriksa status login...</p>;
  }

  return (
    <div className="max-w-md mx-auto mt-16 p-6 border rounded-lg bg-white space-y-3">
      <h1 className="text-xl font-bold text-indigo-800">Profil Saya</h1>
      <p className="text-sm text-gray-600">Email: {user.email}</p>
      <p className="text-sm text-gray-600">Role: {role}</p>
      <p className="text-xs text-gray-400">Halaman ini cuma bisa diakses setelah login.</p>
    </div>
  );
}