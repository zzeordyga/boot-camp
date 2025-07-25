"use client";
import { useEffect, useState } from "react";
import { auth, db } from "../../lib/firebase";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";

export default function AdminDashboardPage() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (!currentUser) {
        router.push("/login");
      } else {
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);
        const userData = userSnap.data();
        if (userData?.role === "admin") {
          setUser(currentUser);
          setRole("admin");
        } else {
          alert("Access denied. Admins only.");
          router.push("/");
        }
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await auth.signOut();
    router.push("/2501989462/assignment-10");
  };

  return (
    role === "admin" && (
      <div>
        <h1>Admin Dashboard</h1>
        <p>Welcome, {user?.email}</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    )
  );
}
