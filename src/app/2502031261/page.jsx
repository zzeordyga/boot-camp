'use client'
import React, { useState, useEffect, useRef, useMemo } from 'react';

const MyPage = () => {
  const name = "Tatras Kennosya Destama Tamri";
  const nim = "2502031261";

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");


  const searchInputRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchPosts() {
      try {
        setLoading(true);
        const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=12");
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
    searchInputRef.current?.focus();

    return () => { isMounted = false; };
  }, []);
  
  const filteredPosts = useMemo(() => {
    if (!query.trim()) return posts;
    const lower = query.toLowerCase();
    return posts.filter((p) => p.title.toLowerCase().includes(lower));
  }, [posts, query]);

  return (
    <div style={{ padding: '0' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>
        {name} - {nim}
      </h2>
      <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
        Latest posts, fetched from jsonplaceholder.typicode.com
      </p>

      <input
        ref={searchInputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Filter posts by title..."
        style={{
          width: '100%', boxSizing: 'border-box', marginBottom: '1.5rem',
          padding: '0.6rem 1rem', borderRadius: '8px', border: '1px solid #cbd5e1',
          fontSize: '0.9rem'
        }}
      />

      {loading && <p style={{ color: '#64748b' }}>Loading posts…</p>}

      {error && (
        <p style={{ color: '#dc2626', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '0.75rem' }}>
          Failed to load posts: {error}
        </p>
      )}

      {!loading && !error && (
        <>
          <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.75rem' }}>
            Showing {filteredPosts.length} of {posts.length} posts
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
            {filteredPosts.map((post) => (
              <article key={post.id} style={{
                background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0',
                padding: '1rem', boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
              }}>
                <h3 style={{ textTransform: 'capitalize', marginBottom: '0.5rem', fontSize: '1rem' }}>
                  {post.title}
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
                  {post.body}
                </p>
              </article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <p style={{ color: '#94a3b8', fontStyle: 'italic', marginTop: '1.5rem' }}>
              No posts match "{query}".
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default MyPage;
