"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

// Tipe data untuk Post
interface Post {
  id: string;
  title: string;
  content: string;
  createdAt?: any;
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    try {
      const unsub = onSnapshot(
        collection(db, "posts"),
        (snap) => {
          let data: Post[] = snap.docs.map((d) => {
            const docData = d.data() as Omit<Post, "id">;
            return {
              id: d.id,
              ...docData,
            };
          });

          // Filter realtime
          data = data.filter((p) =>
            p.title.toLowerCase().includes(search.toLowerCase())
          );

          setPosts(data);
          setLoading(false);
        },
        (err) => {
          console.error(err);
          setError("Failed to load posts");
          setLoading(false);
        }
      );

      return () => unsub();
    } catch (e) {
      console.error(e);
      setError("Unexpected error");
      setLoading(false);
    }
  }, [search]);

  if (loading)
    return <p style={{ padding: 30, fontSize: 18 }}>Loading...</p>;

  if (error)
    return (
      <p style={{ padding: 30, fontSize: 18, color: "red" }}>{error}</p>
    );

  return (
    <div style={{ padding: "40px", maxWidth: 800, margin: "0 auto" }}>
      <h1 style={{ marginBottom: 20 }}>Firebase Posts</h1>

      <input
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearch(e.target.value)
        }
        placeholder="Search title..."
        style={{
          width: "100%",
          padding: 12,
          borderRadius: 8,
          border: "1px solid #444",
          backgroundColor: "#1a1a1a",
          color: "white",
          marginBottom: 30,
        }}
      />

      {posts.length === 0 ? (
        <p>No posts match your search.</p>
      ) : (
        posts.map((p) => (
          <div
            key={p.id}
            style={{
              padding: 20,
              border: "1px solid #333",
              borderRadius: 10,
              marginBottom: 20,
              backgroundColor: "#1b1b1b",
            }}
          >
            <h2 style={{ marginBottom: 10 }}>{p.title}</h2>
            <p style={{ opacity: 0.8 }}>{p.content}</p>
          </div>
        ))
      )}
    </div>
  );
}
