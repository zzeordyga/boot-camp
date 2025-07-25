"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/firebase";
import { useRouter } from "next/navigation";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useLocalStorage } from "@/components/useLocalStorage";
import Navbar from "@/components/Navbar";
import React from "react";

export default function AdminDashboard() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);
  const [activeTab, setActiveTab] = useLocalStorage("adminTab", "logs");

  const tabs = ["logs", "users", "posts"];
  const router = useRouter();

  useEffect(() => {
    setHasMounted(true);
    let unsubscribe;

    const fetchData = async (user) => {
      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.data();

        if (userData.role !== "admin") {
          alert("Akses hanya untuk admin.");
          return router.push("/2440068423/posts");
        }

        // Ambil adminlogs
        const logsSnap = await getDocs(collection(db, "adminlogs"));
        const logs = logsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setPosts(logs);

        // Ambil users
        const usersSnap = await getDocs(collection(db, "users"));
        const usersData = usersSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setUsers(usersData);

        // Ambil posts
        const postsSnap = await getDocs(collection(db, "posts"));
        const postsData = postsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setAllPosts(postsData);

        setLoading(false);
      } catch (err) {
        console.error("Gagal ambil data:", err.message);
      }
    };

    unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/2440068423/login");
      } else {
        fetchData(user);
      }
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [router]);

  if (!hasMounted) return null;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-900 text-white px-4 py-6 sm:px-8">
        <h2 className="text-3xl font-bold mb-4">Dashboard Admin</h2>

        {/* Tabs */}
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0 mb-6">
  {tabs.map((tab) => (
    <button
      key={tab}
      onClick={() => setActiveTab(tab)}
      className={`px-4 py-2 rounded text-sm sm:text-base ${
        activeTab === tab ? "bg-blue-600" : "bg-gray-700"
      }`}
    >
      {tab.toUpperCase()}
    </button>
  ))}
</div>
        {/* Tab content */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {activeTab === "logs" && (
              <ul className="space-y-4">
                {posts.map((post) => (
                  <li
                    key={post.id}
                    className="bg-gray-800 p-4 sm:p-6 rounded shadow text-sm sm:text-base"
                  >
                    <p className="font-semibold">{post.title || "Judul tidak ada"}</p>
                    <p className="text-gray-400">
                      {post.timestamp
                        ? new Date(post.timestamp.seconds * 1000).toLocaleString("id-ID")
                        : "Tanggal tidak tersedia"}
                    </p>
                  </li>
                ))}
              </ul>
            )}

            {activeTab === "users" && (
  <ul className="space-y-4">
    {users.map((user) => (
      <li
        key={user.id}
        className="bg-gray-800 p-4 sm:p-6 rounded shadow text-sm sm:text-base"
      >
        <p className="font-semibold">{user.email || "Tidak ada email"}</p>
        <p className="text-gray-400">Role: {user.role || "user"}</p>
      </li>
    ))}
  </ul>
)}

            {activeTab === "posts" && (
  <ul className="space-y-4">
    {allPosts.map((post) => (
      <li
        key={post.id}
        className="bg-gray-800 p-4 sm:p-6 rounded shadow text-sm sm:text-base"
      >
        <p className="font-semibold">{post.title || "Tanpa Judul"}</p>
        <p className="text-gray-400">
          {(post.timestamp || post.createdAt)
            ? new Date(
                (post.timestamp?.seconds || post.createdAt?.seconds) * 1000
              ).toLocaleString("id-ID")
            : "Tanggal tidak tersedia"}
        </p>
      </li>
    ))}
  </ul>
)}
          </>
        )}
      </div>
    </>
  );
}
