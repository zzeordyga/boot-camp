"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthRole } from "../../useAuthRole";

export default function AdminDashboardPage() {
  const router = useRouter();
  const { user, role, loading } = useAuthRole();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.push("/2602096716/login");
    } else if (role !== "admin") {
      router.push("/2602096716/user/profile");
    }
  }, [loading, user, role, router]);

  if (loading || !user || role !== "admin") {
    return <p className="p-6 text-gray-500">Memeriksa akses...</p>;
  }

  return (
    <div className="max-w-md mx-auto mt-16 p-6 border rounded-lg bg-white space-y-3">
      <h1 className="text-xl font-bold text-indigo-800">Admin Dashboard</h1>
      <p className="text-sm text-gray-600">Selamat datang, {user.email}</p>
      <p className="text-xs text-gray-400">Halaman ini cuma bisa diakses oleh role admin.</p>
    </div>
  );
}