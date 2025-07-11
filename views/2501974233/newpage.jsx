'use client';
import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';

export default function MainPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  const upperPosts = useMemo(() => {
    return posts.map((post) => ({
      ...post,
      title: post.title.toUpperCase()
    }));
  }, [posts]);

  return (
    <div>
      <h2>Top 5 Posts</h2>
      <ul style={{ lineHeight: '2em' }}>
        {upperPosts.map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>
          </li>
        ))}
      </ul>

      <Link href="/2501974233/details">
        <button style={{ marginTop: 20, padding: '10px 20px' }}>Go to Details</button>
      </Link>
    </div>
  );
}
