// views/12345678/page.jsx
"use client";

import { useState, useEffect, useMemo } from "react";

export default function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  const totalWords = useMemo(() => {
    return posts.reduce((acc, post) => acc + post.body.split(" ").length, 0);
  }, [posts]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-purple-700">📚 Post Terbaru</h2>

      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="p-4 bg-gray-100 rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{post.title}</h3>
            <p className="text-gray-700 leading-relaxed">{post.body}</p>
          </li>
        ))}
      </ul>

      <p className="text-sm text-gray-500 italic">
        Total kata di semua post: <span className="font-semibold">{totalWords}</span>
      </p>
    </div>
  );
}
