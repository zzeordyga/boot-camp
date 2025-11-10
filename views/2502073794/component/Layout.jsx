export default function Layout({ children }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f9fafb",
        color: "#333",
      }}
    >
      <header
        style={{
          backgroundColor: "#2563eb",
          color: "white",
          padding: "12px 16px",
          textAlign: "center",
          fontWeight: "600",
          fontSize: "18px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        }}
      >
        Nuky Yasuar Zamzamy
      </header>

      <main
        style={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          padding: "16px",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
            width: "100%",
            maxWidth: "900px",
            padding: "16px",
            overflowX: "auto",
          }}
        >
          {children}
        </div>
      </main>

      <footer
        style={{
          backgroundColor: "#1f2937",
          color: "white",
          textAlign: "center",
          padding: "10px",
          fontSize: "14px",
        }}
      >
        Assignment Week 8
      </footer>
    </div>
  );
}
