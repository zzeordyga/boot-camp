"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import getConfig from "@/app/firebase/config";

export default function AdminDashboard() {
  const [adminData, setAdminData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const { auth, db } = getConfig();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        const userRef = doc(db, "Users", uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          if (data.role === "admin") {
            setAdminData(data);
          } else {
            alert("Access denied: Not an admin.");
            router.push("/user/profile");
          }
        } else {
          alert("User data not found.");
          router.push("/");
        }
      } else {
        router.push("/"); 
      }
    });

    return () => unsubscribe();
  }, []);

  if (!adminData) return <div className="text-center mt-10">Loading dashboard...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="border border-gray-300 rounded-md p-8 w-96 shadow-md">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <p><strong>Name:</strong> {adminData.name}</p>
        <p><strong>Email:</strong> {adminData.email}</p>
        <p><strong>Role:</strong> {adminData.role}</p>

        <button
          onClick={() => {
            const { auth } = getConfig();
            auth.signOut();
            router.push("/");
          }}
          className="mt-5 w-full bg-red-600 text-white rounded-md py-2"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
