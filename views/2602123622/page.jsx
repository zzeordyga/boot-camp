"use client";

import { useState, useEffect, useRef, useMemo } from "react";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=10")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch posts:", err);
        setLoading(false);
      });

    inputRef.current?.focus();
  }, []);

  const filteredPosts = useMemo(() => {
    if (!search.trim()) return posts;
    const lower = search.toLowerCase();
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(lower) ||
        post.body.toLowerCase().includes(lower)
    );
  }, [posts, search]);

  const totalWords = useMemo(() => {
    return filteredPosts.reduce((acc, post) => acc + post.body.split(" ").length, 0);
  }, [filteredPosts]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-lg text-gray-500 animate-pulse">Loading posts...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-indigo-700">📝 Posts</h2>

      <div className="flex gap-3 flex-wrap">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search posts..."
          value={search}
          onChange={handleSearchChange}
          className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <span className="self-center text-sm text-gray-500">
          {filteredPosts.length} post{filteredPosts.length !== 1 ? "s" : ""}
        </span>
      </div>

      <ul className="space-y-4">
        {filteredPosts.map((post) => (
          <li
            key={post.id}
            className="p-4 bg-white rounded-lg shadow hover:shadow-md transition border border-gray-100"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2 capitalize">
              {post.title}
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              {post.body}
            </p>
            <span className="inline-block mt-2 text-xs font-medium text-indigo-500 bg-indigo-50 px-2 py-1 rounded">
              Post #{post.id}
            </span>
          </li>
        ))}
      </ul>

      <p className="text-sm text-gray-500 italic border-t pt-4">
        Total words in visible posts:{" "}
        <span className="font-semibold text-gray-700">{totalWords}</span>
      </p>
    </div>
  );
}