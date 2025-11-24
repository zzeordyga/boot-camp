"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { requireAdmin } from "../../lib/protect";

export default function AdminDashboard() {
  const router = useRouter();

  useEffect(() => {
    requireAdmin(router);
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Only admins can see this page.</p>
    </div>
  );
}
