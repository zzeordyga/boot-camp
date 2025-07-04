'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(setPosts);
  }, []);

  const filteredPosts = useMemo(() => {
    return posts.filter(post =>
      post.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, posts]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * postsPerPage;
    return filteredPosts.slice(start, start + postsPerPage);
  }, [filteredPosts, currentPage]);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Latest Posts</h2>

      <input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1); // Reset page on search
        }}
        placeholder="Search posts..."
        style={{ marginBottom: '1rem', padding: '0.5rem', width: '100%' }}
      />

      <div style={{ display: 'grid', gap: '1rem' }}>
        {paginatedPosts.map(post => (
          <div
            key={post.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '1rem',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              backgroundColor: '#fff'
            }}
          >
            <h3 style={{ marginBottom: '0.5rem' }}>{post.title}</h3>
            <Link
              href={`/2540127383/details?id=${post.id}`}
              style={{
                marginTop: '1rem',
                display: 'inline-block',
                backgroundColor: '#0070f3',
                color: '#fff',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                textDecoration: 'none'
              }}
            >
              View Detail
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div style={{ marginTop: '2rem', display: 'flex', gap: '0.5rem' }}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            style={{
              padding: '0.5rem 1rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
              backgroundColor: page === currentPage ? '#0070f3' : '#fff',
              color: page === currentPage ? '#fff' : '#000',
              cursor: 'pointer'
            }}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
}