"use client";
import { useEffect, useState } from "react";
import { auth } from "../../firebase/config";
import { useRouter } from "next/navigation";

export default function UserProfile() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => {
      if (!u) {
        router.push("/login");
      } else {
        setUser(u);
      }
    });
    return () => unsub();
  }, []);

  return (
    <div>
      <h1>User Profile</h1>
      {user && <p>Email: {user.email}</p>}
    </div>
  );
}
