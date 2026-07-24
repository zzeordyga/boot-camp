export default function Layout({ children }) {
  return (
    <main
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "30px",
        border: "1px solid #ddd",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Halo Kevin di sini 👋</h1>

      <h2>NIM: 2602076885</h2>

      <hr style={{ margin: "20px 0" }} />

      {children}
    </main>
  );
}
