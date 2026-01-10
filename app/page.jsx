import Link from "next/link";

export default function Home() {
  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Welcome to Boot Camp</h1>
      <p>Silakan buka halaman tugas kamu:</p>
      <Link href="/2201792032">
        <button
          style={{
            marginTop: "1rem",
            padding: "0.5rem 1rem",
            backgroundColor: "#1d4ed8",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
          }}
        >
          Buka Halaman 2201792032
        </button>
      </Link>
    </div>
  );
}
