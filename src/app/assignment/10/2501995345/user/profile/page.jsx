"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import useAuth from "../../_hooks/useAuth";

export default function Profile() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user && !loading) {
      router.push("/assignment/10/2501995345");
    }
  }, [user, loading, router]);

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-blue-500">Profile Dashboard</h1>
      <p className="text-xl">Hello, {user.email}!</p>
    </div>
  );
}
