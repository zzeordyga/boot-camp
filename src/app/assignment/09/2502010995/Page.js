'use client'; // Komponen ini interaktif

import { useState, useEffect } from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from './firebase'; // Impor koneksi db
import ErrorBoundary from './ErrorBoundary'; // Impor Error Boundary

export default function PostsPage() {
  // State untuk menyimpan data, loading, error, dan keyword pencarian
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // useEffect untuk real-time data fetching dengan onSnapshot
  useEffect(() => {
    const q = query(collection(db, 'posts'));

    // onSnapshot akan "mendengarkan" perubahan pada koleksi
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postsData = [];
      querySnapshot.forEach((doc) => {
        postsData.push({ id: doc.id, ...doc.data() });
      });
      setPosts(postsData);
      setLoading(false); // Selesai loading setelah data pertama diterima
    }, (err) => {
      // Tangani error jika gagal fetching
      console.error(err);
      setError('Gagal memuat data. Silakan coba lagi.');
      setLoading(false);
    });

    // Cleanup function: berhenti "mendengarkan" saat komponen di-unmount
    return () => unsubscribe();
  }, []); // Array dependensi kosong, hanya berjalan sekali saat mount

  // Logika untuk memfilter postingan berdasarkan searchTerm
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ErrorBoundary>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Daftar Postingan (Real-time)</h1>
        
        <input
          type="text"
          placeholder="Cari berdasarkan judul..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 mb-6 rounded bg-gray-200 text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Menampilkan state UI: Loading */}
        {loading && <p className="text-center">Memuat data...</p>}
        
        {/* Menampilkan state UI: Error */}
        {error && <p className="text-center text-red-500">{error}</p>}
        
        {/* Menampilkan data jika tidak loading dan tidak ada error */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.length > 0 ? (
              filteredPosts.map(post => (
                <div key={post.id} className="bg-white text-gray-800 rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                  <p>{post.content}</p>
                  <small className="text-gray-500 mt-4 block">
                    {/* Tampilkan tanggal jika ada */}
                    {post.createdAt?.toDate().toLocaleDateString()}
                  </small>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center">Tidak ada postingan yang cocok.</p>
            )}
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
}
