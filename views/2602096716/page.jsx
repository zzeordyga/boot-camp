"use client";

import { useState, useEffect, useMemo } from "react";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=10")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      });
  }, []);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) =>
      post.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [posts, search]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Daftar Post</h2>

      <input
        type="text"
        placeholder="Cari judul..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-3 py-2 border rounded"
      />

      {loading ? (
        <p className="text-gray-500">Memuat...</p>
      ) : (
        <ul className="space-y-3">
          {filteredPosts.map((post) => (
            <li key={post.id} className="p-3 border rounded bg-white">
              <h3 className="font-semibold">{post.title}</h3>
              <p className="text-sm text-gray-600">{post.body}</p>
            </li>
          ))}
        </ul>
      )}

      <p className="text-xs text-gray-400">{filteredPosts.length} dari {posts.length} post</p>
    </div>
  );
}