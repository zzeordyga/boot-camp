'use client';

import { useEffect, useState, useMemo } from 'react';

export default function DetailsPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  const postCount = useMemo(() => posts.length, [posts]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">📋 Latest Posts</h2>
      <p className="text-gray-500 mb-4">Showing {postCount} posts</p>
      <ul className="space-y-3">
        {posts.map(post => (
          <li key={post.id} className="border rounded p-3 hover:bg-gray-50">
            <h3 className="font-bold">{post.title}</h3>
            <p className="text-sm">{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
