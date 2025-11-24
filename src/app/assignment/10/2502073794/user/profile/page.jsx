"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { requireAuth } from "../../lib/protect";

export default function ProfilePage() {
  const router = useRouter();

  useEffect(() => {
    requireAuth(router);
  }, []);

  const role =
    typeof window !== "undefined" ? localStorage.getItem("role") : null;

  return (
    <div>
      <h1>User Profile</h1>
      <p>Role: {role}</p>
    </div>
  );
}
