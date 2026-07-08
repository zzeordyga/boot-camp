"use client";

function formatDate(createdAt) {
  if (!createdAt) return "Unknown date";
  // Firestore Timestamp has a toDate() method
  const date = typeof createdAt.toDate === "function" ? createdAt.toDate() : new Date(createdAt);
  return date.toLocaleString();
}

export default function PostCard({ post }) {
  return (
    <article
      style={{
        border: "1px solid #e2e2e2",
        borderRadius: 8,
        padding: "1rem 1.25rem",
        marginBottom: "1rem",
      }}
    >
      <h3 style={{ margin: "0 0 0.5rem 0" }}>{post.title}</h3>
      <p style={{ margin: "0 0 0.5rem 0", color: "#333" }}>{post.content}</p>
      <small style={{ color: "#888" }}>{formatDate(post.createdAt)}</small>
    </article>
  );
}
