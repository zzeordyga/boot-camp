// posts/page.js
'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase';
import { useLocalStorage } from "@/components/useLocalStorage";

import Navbar from "@/components/Navbar";

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMounted, setHasMounted] = useState(false);
  const [sortOrder, setSortOrder] = useLocalStorage("sortOrder", "desc"); // default ke "desc"

  const filteredPosts = posts
  .filter((p) =>
    (p.title || "").toLowerCase().includes(search.toLowerCase())
  )
  .sort((a, b) => {
    if (!a.createdAt || !b.createdAt) return 0;
    return sortOrder === "asc"
      ? a.createdAt - b.createdAt
      : b.createdAt - a.createdAt;
  });

  useEffect(() => {
    setHasMounted(true);

    const unsubscribe = onSnapshot(
      collection(db, 'posts'),
      (querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => {
          const docData = doc.data();
          return {
            id: doc.id,
            ...docData,
            createdAt: docData.createdAt?.toDate?.() || null, // pastikan toDate() dipanggil
          };
        });
        setPosts(data);
        setLoading(false);
      },
      (error) => {
        console.error('Error saat mengambil data:', error);
        setError('Gagal mengambil data');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gray-900 text-white px-4 sm:px-6 py-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 text-purple-300">📚 Semua Postingan</h1>

<div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
      <input
        type="text"
        placeholder="Cari berdasarkan judul..."
        className="w-full sm:max-w-xs p-2 bg-gray-800 border border-gray-600 text-white rounded placeholder-gray-400"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

<div className="flex items-center gap-2">
    <label htmlFor="sort" className="text-sm text-gray-400">Urutkan:</label>
      <select
  value={sortOrder}
  onChange={(e) => setSortOrder(e.target.value)}
  className="w-full sm:w-auto p-2 bg-gray-800 border border-gray-600 text-white rounded"
>

    <option value="desc">Terbaru</option>
    <option value="asc">Terlama</option>
  </select>
  </div>
  </div>

      {loading ? (
        <p className="text-gray-400 italic">Memuat postingan...</p>
      ) : error ? (
        <p className="text-red-400">{error}</p>
      ) : filteredPosts.length === 0 ? (
        <p className="text-gray-400 italic">Tidak ada postingan ditemukan.</p>
      ) : (
        <ul className="space-y-4">
          {filteredPosts.map(post => (
            <li key={post.id} className="bg-gray-800 text-white p-4 sm:p-5 rounded shadow hover:shadow-lg transition">
  <h3 className="font-semibold text-base sm:text-lg text-purple-200">{post.title}</h3>
  <p className="text-sm sm:text-base text-gray-200">{post.content}</p>
              {post.createdAt && hasMounted && (
                <p className="text-sm text-gray-400 mt-2 italic">
                  Ditambahkan: {post.createdAt.toLocaleString('id-ID', {
                    dateStyle: 'long',
                    timeStyle: 'short',
                  })}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
    </>
  );
}
