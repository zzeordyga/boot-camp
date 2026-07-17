export default function PostCard({ post }) {
  return (
    <div
      className="transition-transform duration-300 hover:-translate-y-1"
      style={{
        display: "flex",
        overflow: "hidden",
        borderRadius: "14px",
        marginBottom: "22px",
        background: "#1e293b",
        boxShadow: "0 8px 18px rgba(0,0,0,0.25)",
      }}
    >
      {/* Gold */}
      <div
        style={{
          width: "8px",
          background: "#facc15",
        }}
      />

      {/* Konten */}
      <div
        style={{
          flex: 1,
          padding: "22px",
        }}
      >
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "700",
            marginBottom: "12px",
            color: "white",
          }}
        >
          ⚽ {post.title}
        </h2>

        <p
          style={{
            color: "#d1d5db",
            whiteSpace: "pre-line",
            lineHeight: "1.8",
            marginBottom: "18px",
          }}
        >
          {post.content}
        </p>

        <p
          style={{
            fontSize: "0.9rem",
            color: "#9ca3af",
          }}
        >
          📅{" "}
          {post.createdAt?.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
    </div>
  );
}
