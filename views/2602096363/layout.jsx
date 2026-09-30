import Link from "next/link";

export default function StudentLayout({ children }) {
  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "sans-serif",
      }}
    >
      <header
        style={{
          borderBottom: "2px solid #eaeaea",
          paddingBottom: "10px",
          marginBottom: "20px",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "24px" }}>
          Dashboard NIM: 2602096363
        </h1>
        <nav style={{ marginTop: "10px", display: "flex", gap: "15px" }}>
          <Link
            href="/2602096363"
            style={{ color: "#0070f3", textDecoration: "none" }}
          >
            Beranda
          </Link>
          <Link
            href="/2602096363/details"
            style={{ color: "#0070f3", textDecoration: "none" }}
          >
            Detail & Stats
          </Link>
        </nav>
      </header>

      <main>{children}</main>

      <footer
        style={{
          marginTop: "40px",
          paddingTop: "10px",
          borderTop: "1px solid #eaeaea",
          fontSize: "12px",
          color: "#666",
        }}
      >
        React & Next.js Integration — NIM 2602096363
      </footer>
    </div>
  );
}
