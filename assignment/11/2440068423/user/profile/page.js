"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { useLocalStorage } from "@/components/useLocalStorage";
import { onAuthStateChanged } from "firebase/auth";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [hasMounted, setHasMounted] = useState(false);
  const [cachedEmail, setCachedEmail] = useLocalStorage("userEmail", "");
  const [cachedRole, setCachedRole] = useLocalStorage("userRole", "");

  const router = useRouter();

  useEffect(() => {
    setHasMounted(true);
    let unsubscribe;

    const fetchProfile = async (user) => {
      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setProfile(data);
          setCachedEmail(data.email || "");
          setCachedRole(data.role || "");
        } else {
          alert("Data user tidak ditemukan.");
          router.push("/2440068423/login");
        }
      } catch (err) {
        console.error("Gagal ambil data:", err.message);
        router.push("/2440068423/login");
      }
    };

    unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/2440068423/login");
      } else {
        fetchProfile(user);
      }
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [router, setCachedEmail, setCachedRole]);

  if (!hasMounted) return null;

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
        ) : cachedEmail || cachedRole ? (
          <div className="bg-gray-800 p-6 rounded shadow space-y-2">
            <p className="text-yellow-400 text-sm italic">Offline Mode (dari cache)</p>
            <p><strong>Email:</strong> {cachedEmail}</p>
            <p><strong>Role:</strong> {cachedRole}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}