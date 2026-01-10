export default function Layout({ children }) {
  return (
    <div style={{ minHeight: "100vh", padding: 24, fontFamily: "serif" }}>
      <header style={{ fontSize: 28, fontWeight: "bold", marginBottom: 16 }}>
        My API Page - 2602109643
      </header>

      <main style={{ maxWidth: 960, margin: "0 auto" }}>{children}</main>

      <footer style={{ marginTop: 32, color: "#666" }}>
        Made by 2602109643
      </footer>
    </div>
  );
}
