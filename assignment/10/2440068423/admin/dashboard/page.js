"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/firebase";
import { useRouter } from "next/navigation";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import Navbar from "@/components/Navbar";

export default function AdminDashboard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(() => {
  const fetchData = async () => {
    const user = auth.currentUser;
    if (!user) return router.push("/2440068423/login");

    const userDoc = await getDoc(doc(db, "users", user.uid));
    const userData = userDoc.data();

    if (userData.role !== "admin") {
      alert("Akses hanya untuk admin.");
      return router.push("/2440068423/posts");
    }

    const snapshot = await getDocs(collection(db, "adminlogs"));
    const result = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setPosts(result);
    setLoading(false);
  };

  fetchData();
}, []); // Router tetap tidak dimasukkan

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <h2 className="text-3xl font-bold mb-4">Dashboard Admin</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className="space-y-4">
            {posts.map((post) => (
              <li key={post.id} className="bg-gray-800 p-4 rounded shadow">
                <p className="font-semibold">{post.title || "Judul tidak ada"}</p>
                <p className="text-sm text-gray-400">
                {post.timestamp
                    ? new Date(post.timestamp.seconds * 1000).toLocaleString("id-ID")
                    : "Tanggal tidak tersedia"}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
