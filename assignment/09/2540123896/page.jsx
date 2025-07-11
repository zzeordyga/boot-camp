'use client'
import React, { useEffect, useState } from "react";
import { db } from "./lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    // Optionally log error
  }
  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong. Please try again later.</h2>;
    }
    return this.props.children;
  }
}

function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts"),
      (snapshot) => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPosts(data);
        setLoading(false);
      },
      (err) => {
        setError("Failed to fetch posts");
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Posts</h1>
      <input
        type="text"
        placeholder="Search by title..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <ul>
        {filteredPosts.map(post => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <p>{post.content}</p>
            <small>{new Date(post.createdAt.seconds * 1000).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Page() {
  return (
    <ErrorBoundary>
      <PostsPage />
    </ErrorBoundary>
  );
}