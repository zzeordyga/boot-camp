import Link from "next/link";

export default function HomePage() {
  return (
    <main style={{ maxWidth: "800px", margin: "0 auto", padding: "32px 24px" }}>
      <h1 style={{ margin: "0 0 12px", fontSize: "28px" }}>
        Next.js + Firebase Posts
      </h1>
      <p style={{ margin: "0 0 20px", color: "#4b5563" }}>
        Buka halaman posts untuk melihat daftar artikel dari Cloud Firestore.
      </p>
      <Link
        href="/posts"
        style={{
          display: "inline-block",
          padding: "10px 18px",
          borderRadius: "8px",
          background: "#1f2937",
          color: "#fff",
          textDecoration: "none",
          fontWeight: 600,
        }}
      >
        Lihat Posts
      </Link>
    </main>
  );
}

