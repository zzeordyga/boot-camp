import { useEffect, useState } from "react";
import { db } from "../firebase"; // Pastikan path firebase.js sesuai
import { collection, onSnapshot } from "firebase/firestore";

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "posts"), (snapshot) => {
      try {
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setPosts(data);
      } catch (err) {
        setError("Gagal mengambil data.");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">📌 Daftar Posts</h1>

        <input
          type="text"
          placeholder="Cari judul postingan..."
          className="w-full px-4 py-2 border border-gray-300 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {loading ? (
          <p className="text-gray-500 text-center">🔄 Memuat data...</p>
        ) : error ? (
          <p className="text-red-600 text-center">{error}</p>
        ) : filteredPosts.length === 0 ? (
          <p className="text-gray-500 text-center">❌ Tidak ada postingan ditemukan.</p>
        ) : (
          <ul className="space-y-4">
            {filteredPosts.map((post) => (
              <li key={post.id} className="border border-gray-200 rounded p-4 hover:shadow transition">
                <h2 className="text-xl font-semibold text-blue-700">{post.title}</h2>
                <p className="text-gray-700 mt-1 whitespace-pre-line">{post.content}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}