"use client";
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (u) => {
      if (!u) return router.push("/login");
      const userDoc = await getDoc(doc(db, "users", u.uid));
      const role = userDoc.data()?.role;
      if (role !== "admin") {
        alert("Unauthorized");
        router.push("/");
      } else {
        setUser(u);
      }
    });

    return () => unsub();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {user && <p>Welcome, Admin {user.email}</p>}
    </div>
  );
}
