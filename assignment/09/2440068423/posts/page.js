'use client';

import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMounted, setHasMounted] = useState(false);

  const filteredPosts = posts.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

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
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-4 text-purple-300">📚 Semua Postingan</h1>

      <input
        type="text"
        placeholder="Cari berdasarkan judul..."
        className="w-full p-2 bg-gray-800 border border-gray-600 text-white rounded mb-6 placeholder-gray-400"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <p className="text-gray-400 italic">Memuat postingan...</p>
      ) : error ? (
        <p className="text-red-400">{error}</p>
      ) : filteredPosts.length === 0 ? (
        <p className="text-gray-400 italic">Tidak ada postingan ditemukan.</p>
      ) : (
        <ul className="space-y-4">
          {filteredPosts.map(post => (
            <li key={post.id} className="bg-gray-800 text-white p-4 rounded shadow hover:shadow-lg transition">
              <h3 className="font-semibold text-lg text-purple-200">{post.title}</h3>
              <p className="text-gray-200">{post.content}</p>
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
  );
}
