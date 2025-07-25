"use client";
import { useEffect, useState } from "react";
import { auth } from "../../lib/firebase";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../../components/ProtectedRoute";

export default function UserProfilePage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) setUser(currentUser);
      else router.push("/2501989462/assignment-10");
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await auth.signOut();
    router.push("/2501989462/assignment-10");
  };

  return (
    <ProtectedRoute>
      <div>
        <h1>User Profile</h1>
        <p>Email: {user?.email}</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </ProtectedRoute>
  );
}
