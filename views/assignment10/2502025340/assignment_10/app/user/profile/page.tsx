"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => setUser(u));
    return () => unsub();
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div style={{ padding: 40 }}>
      <h1>Your Profile</h1>
      <p>Email: {user.email}</p>
    </div>
  );
}
