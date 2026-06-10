'use client';
import { useEffect, useMemo, useRef, useState } from "react";

export default function Page() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");

  const inputRef = useRef(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data.slice(0, 10)));
  }, []);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) =>
      post.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [posts, search]);

  return (
    <div className="min-h-screen p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">
        Steven Yong - 2602136266
      </h1>

      <button
        className="px-4 py-2 bg-blue-500 text-white rounded mb-4"
        onClick={() => inputRef.current?.focus()}
      >
        Search
      </button>

      <input
        ref={inputRef}
        type="text"
        placeholder="Search Posts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border rounded p-2 mb-4"
      />

      <p className="mb-4">
        Total Posts: {filteredPosts.length}
      </p>

      <div className="grid gap-4">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="border rounded-lg p-4 shadow-sm"
          >
            <h2 className="font-semibold">{post.title}</h2>
            <p className="text-sm mt-2">{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}