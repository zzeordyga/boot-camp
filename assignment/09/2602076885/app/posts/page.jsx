"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import PostCard from "../components/PostCard";
import SearchBar from "../components/SearchBar";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchPosts() {
      try {
        const querySnapshot = await getDocs(collection(db, "posts"));

        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate(),
        }));

        setPosts(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load posts.");
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();

    const unsubscribe = onSnapshot(collection(db, "posts"), (snapshot) => {
      const realtimePosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
      }));

      setPosts(realtimePosts);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <h2>Loading World Cup news...</h2>;
  }
  if (error) {
    return <h2>{error}</h2>;
  }

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <main
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <h1 >🏆 FIFA World Cup 2026 News</h1>

      <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />

      {filteredPosts.length === 0 ? (
        <p>No World Cup news found.</p>
      ) : (
        filteredPosts.map((post) => <PostCard key={post.id} post={post} />)
      )}
    </main>
  );
}
