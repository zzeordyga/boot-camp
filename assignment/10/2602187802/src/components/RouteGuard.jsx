"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function RouteGuard({ allowedRoles, children }) {
  const { user, role, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/login");
    } else if (!role || !allowedRoles.includes(role)) {
      router.replace("/user/profile");
    }
  }, [loading, user, role, allowedRoles, router]);

  if (loading || !user || !role || !allowedRoles.includes(role)) {
    return <p className="status-text">Memuat...</p>;
  }

  return children;
}
