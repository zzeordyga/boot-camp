import Link from "next/link";

export default function Home() {
  return (
    <main
      style={{
        maxWidth: "700px",
        margin: "80px auto",
        textAlign: "center",
      }}
    >
      <h1>🏆 World Cup News</h1>

      <p>
        Next.js + Firebase application that displays World Cup posts
        with real-time updates
      </p>

      <Link
        href="/posts"
        style={{
          display: "inline-block",
          marginTop: "20px",
          padding: "12px 20px",
          background: "#2563eb",
          color: "white",
          borderRadius: "8px",
          textDecoration: "none",
        }}
      >
        View Posts
      </Link>
    </main>
  );
}
