import React, { useState, useEffect, useRef, useMemo } from "react";

const Page = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [search, setSearch] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=10")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  const filteredPosts = useMemo(() => {
    return posts.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, posts]);

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        color: "#f0f0f0",
        backgroundColor: "#121212",
        minHeight: "100vh",
        padding: "30px",
      }}
    >
      <h1 style={{ color: "#61dafb", marginBottom: "20px" }}>
        React + Next.js Page - 2502025340
      </h1>

      <input
        ref={inputRef}
        type="text"
        placeholder="Search post title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #444",
          backgroundColor: "#1e1e1e",
          color: "white",
          marginBottom: "25px",
        }}
      />

      {!selectedPost ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              style={{
                backgroundColor: "#1e1e1e",
                border: "1px solid #333",
                borderRadius: "10px",
                padding: "15px",
                transition: "transform 0.2s",
              }}
            >
              <h3 style={{ color: "#61dafb" }}>{post.title}</h3>
              <p style={{ color: "#ccc" }}>{post.body.substring(0, 80)}...</p>
              <button
                onClick={() => setSelectedPost(post)}
                style={{
                  marginTop: "10px",
                  backgroundColor: "#61dafb",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  color: "#000",
                  fontWeight: "600",
                }}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <h2 style={{ color: "#61dafb" }}>{selectedPost.title}</h2>
          <p
            style={{
              color: "#ccc",
              fontSize: "18px",
              maxWidth: "700px",
              margin: "20px auto",
            }}
          >
            {selectedPost.body}
          </p>
          <button
            onClick={() => setSelectedPost(null)}
            style={{
              marginTop: "20px",
              backgroundColor: "#333",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Back to List
          </button>
        </div>
      )}
    </div>
  );
};

export default Page;