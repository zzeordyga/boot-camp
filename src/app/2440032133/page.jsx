"use client";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebase/firebaseInit";

import PostItem from "./components/PostItem";
import SearchBar from "./components/SearchBar";
import ErrorMessage from "./components/ErrorMessage";

export default function Page() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts"),
      (snapshot) => {
        const result = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(result);
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching posts:", err);
        setError("Gagal mengambil data.");
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Daftar Post</h1>
      <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
      {filteredPosts.map((post) => (
        <PostItem key={post.id} title={post.title} content={post.content} />
      ))}
    </div>
  );
}
