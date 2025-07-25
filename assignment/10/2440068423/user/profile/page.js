"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const router = useRouter();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const fetchProfile = async () => {
      const user = auth.currentUser;
      if (!user) return router.push("/2440068423/login");

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        setProfile(userDoc.data());
      } else {
        alert("Data user tidak ditemukan.");
        router.push("/2440068423/login");
      }
    };

    fetchProfile();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <h2 className="text-3xl font-bold mb-4">Profil Saya</h2>
        {profile ? (
          <div className="bg-gray-800 p-6 rounded shadow space-y-2">
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Role:</strong> {profile.role}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}
