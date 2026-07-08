"use client";

import { useState, useEffect, useRef, useMemo } from "react";

export default function NimPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  // useRef: keep a focusable reference to the search input
  const searchInputRef = useRef(null);

  // useEffect: fetch data once on mount
  useEffect(() => {
    let isMounted = true;

    async function fetchPosts() {
      try {
        setLoading(true);
        const res = await fetch(
          "https://jsonplaceholder.typicode.com/posts?_limit=12"
        );
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        const data = await res.json();
        if (isMounted) setPosts(data);
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchPosts();

    // autofocus the search box once the layout has mounted
    searchInputRef.current?.focus();

    return () => {
      isMounted = false;
    };
  }, []);

  // useMemo: derive filtered list only when posts or query change
  const filteredPosts = useMemo(() => {
    if (!query.trim()) return posts;
    const lower = query.toLowerCase();
    return posts.filter((p) => p.title.toLowerCase().includes(lower));
  }, [posts, query]);

  return (
    <section>
      <h2 className="text-2xl font-bold mb-2">Latest Posts</h2>
      <p className="text-slate-500 mb-6">
        Data fetched from{" "}
        <code className="bg-slate-200 px-1 rounded">jsonplaceholder.typicode.com</code>
      </p>

      <input
        ref={searchInputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Filter posts by title..."
        className="w-full mb-6 rounded-lg border border-slate-300 px-4 py-2 text-sm
                   focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />

      {loading && (
        <p className="text-slate-500 animate-pulse">Loading posts…</p>
      )}

      {error && (
        <p className="text-red-600 bg-red-50 border border-red-200 rounded p-3">
          Failed to load posts: {error}
        </p>
      )}

      {!loading && !error && (
        <>
          <p className="text-xs text-slate-400 mb-3">
            Showing {filteredPosts.length} of {posts.length} posts
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-xl shadow-sm border border-slate-200 p-4
                           hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold capitalize mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-slate-500 line-clamp-3">
                  {post.body}
                </p>
              </article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <p className="text-slate-400 italic mt-6">
              No posts match "{query}".
            </p>
          )}
        </>
      )}
    </section>
  );
}
