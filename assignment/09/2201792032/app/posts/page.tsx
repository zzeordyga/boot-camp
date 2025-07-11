'use client';

import { useEffect, useState } from 'react';
import {
  collection,
  onSnapshot,
  Firestore,
} from 'firebase/firestore';
import ErrorBoundary from '../../components/ErrorBoundary';

type Post = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
};

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    let unsubscribe: () => void;

    async function listenToPosts() {
      try {
        const { db }: { db: Firestore } = await import('../../lib/firebaseConfig');
        const colRef = collection(db, 'posts');

        unsubscribe = onSnapshot(colRef, (snapshot) => {
          const data = snapshot.docs.map((doc) => {
            const raw = doc.data();
            return {
              id: doc.id,
              title: raw.title,
              content: raw.content,
              createdAt: raw.create
                ? new Date(raw.create.seconds * 1000).toLocaleString()
                : 'Tidak ada tanggal',
            };
          });

          setPosts(data);
          setFilteredPosts(data);
          setLoading(false);
        });
      } catch (err) {
        console.error(err);
        setError('Gagal mengambil data.');
        setLoading(false);
      }
    }

    listenToPosts();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  useEffect(() => {
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [search, posts]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ErrorBoundary>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Daftar Posts (Real-time + Search)</h1>

        <input
          type="text"
          placeholder="Cari berdasarkan judul..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded mb-4 w-full"
        />

        {filteredPosts.length === 0 ? (
          <p>Tidak ada post yang cocok.</p>
        ) : (
          <ul className="space-y-4">
            {filteredPosts.map((post) => (
              <li key={post.id} className="border p-4 rounded shadow">
                <h2 className="text-xl font-semibold">{post.title}</h2>
                <p className="text-sm text-gray-600">{post.createdAt}</p>
                <p>{post.content}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </ErrorBoundary>
  );
}
