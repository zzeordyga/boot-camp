"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../../../lib/firebase";

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [manualFetchInfo, setManualFetchInfo] = useState(null);

  useEffect(() => {
    const scriptSrc = "https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4";
    if (!document.querySelector(`script[src="${scriptSrc}"]`)) {
      const script = document.createElement("script");
      script.src = scriptSrc;
      document.head.appendChild(script);
    }
  }, []);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setPosts(data);
        setLoading(false);
      },
      (err) => {
        console.error(err);
        setError("Gagal memuat data secara real-time.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);


  const handleManualFetch = async () => {
    try {
      const snapshot = await getDocs(collection(db, "posts"));
      setManualFetchInfo(`Berhasil ambil ${snapshot.size} dokumen (${new Date().toLocaleTimeString()})`);
    } catch (err) {
      console.error(err);
      setManualFetchInfo("Gagal melakukan fetch manual.");
    }
  };

  const filteredPosts = posts.filter((post) =>
    post.title?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p className="p-6 text-gray-500">Memuat data...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold text-indigo-800">Daftar Post (Real-time)</h1>

      <button
        onClick={handleManualFetch}
        className="text-sm px-3 py-1 border rounded text-indigo-700 border-indigo-700"
      >
        Fetch sekali (getDocs)
      </button>
      {manualFetchInfo && <p className="text-xs text-gray-500">{manualFetchInfo}</p>}

      <input
        type="text"
        placeholder="Cari judul post..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-3 py-2 border rounded"
      />

      <ul className="space-y-3">
        {filteredPosts.map((post) => (
          <li key={post.id} className="p-4 border rounded-lg bg-white shadow-sm">
            <h2 className="font-semibold text-gray-800">{post.title}</h2>
            <p className="text-sm text-gray-600 mt-1">{post.content}</p>
          </li>
        ))}
      </ul>

      {filteredPosts.length === 0 && (
        <p className="text-sm text-gray-400">Tidak ada post yang cocok.</p>
      )}
    </div>
  );
}