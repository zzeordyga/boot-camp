"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import useAuth from "../../_hooks/useAuth";

export default function AdminDashboard() {
  const { user, role, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/assignment/10/2501995345");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (!loading && user && role !== "ADMIN") {
      router.push("/assignment/10/2501995345/user/profile");
    }
  }, [user, loading, router, role]);

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return null;
  }

  if (user && role !== "ADMIN") {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-blue-500">Admin Dashboard</h1>
      <p className="text-xl">Hello, Admin {user.email}!</p>
    </div>
  );
}
