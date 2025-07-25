import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts"),
      snapshot => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPosts(data);
        setLoading(false);
      },
      err => {
        setError("Failed to fetch real-time data.");
        console.error(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>{error}</p>;


  return (
    <div style={{ padding: "2rem" }}>
      <h1>Posts</h1>

      <input
        type="text"
        placeholder="Search by title..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{
          padding: "0.5rem",
          marginBottom: "1rem",
          width: "100%",
          maxWidth: "400px"
        }}
      />

      {filteredPosts.map(post => (
        <div
          key={post.id}
          style={{
            marginBottom: "1rem",
            padding: "1rem",
            border: "1px solid #ccc"
          }}
        >
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}