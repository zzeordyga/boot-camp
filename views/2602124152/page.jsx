// views/2602124152/page.jsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const searchRef = useRef(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=12");
      if (!res.ok) throw new Error("Failed to fetch posts");
      const data = await res.json();
      setPosts(data);
    } catch (e) {
      setError(e.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    // autofocus search input on first render
    searchRef.current?.focus();
  }, []);

  useEffect(() => {
    // update document title reflecting number of posts shown
    const count = posts.length;
    document.title = `Charles Cahyadi — ${count} posts`;
  }, [posts]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter(
      (p) => p.title.toLowerCase().includes(q) || p.body.toLowerCase().includes(q)
    );
  }, [posts, query]);

  const totalWords = useMemo(() => {
    return filtered.reduce((acc, p) => acc + p.body.split(/\s+/).filter(Boolean).length, 0);
  }, [filtered]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-indigo-700">Beranda</h2>
          <p className="text-gray-600 text-sm">Menampilkan data dari JSONPlaceholder (12 post)</p>
        </div>

        <div className="flex items-center gap-2">
          <input
            ref={searchRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari judul atau isi..."
            className="w-full sm:w-64 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={fetchPosts}
            className="px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-60"
            disabled={loading}
            title="Refresh data"
          >
            {loading ? "Loading..." : "Refresh"}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-50 text-red-700 border border-red-200 rounded">{error}</div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((post) => (
          <article key={post.id} className="p-4 bg-white rounded-lg shadow hover:shadow-md transition">
            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
            <p className="text-gray-700 text-sm leading-relaxed line-clamp-4">{post.body}</p>
            <div className="mt-4 flex items-center justify-between text-sm">
              <a
                href="/2602124152/details"
                className="text-indigo-700 hover:text-indigo-900 font-medium"
              >
                Lihat Details →
              </a>
              <span className="text-gray-500">ID: {post.id}</span>
            </div>
          </article>
        ))}
      </div>

      <div className="text-sm text-gray-600">
        Menampilkan <span className="font-semibold">{filtered.length}</span> dari {posts.length} post •
        Total kata terhitung: <span className="font-semibold">{totalWords}</span>
      </div>
    </div>
  );
}
