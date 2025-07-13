export default function Layout({ children }) {
  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "800px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f9f9f9",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      <header style={{ marginBottom: "20px" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: 5 }}>
          Raditya Tamam – 2502049353
        </h1>
        <p style={{ margin: 0, color: "#555" }}>Assignment 9</p>
        <hr style={{ marginTop: "15px", borderColor: "#ccc" }} />
      </header>

      {children}
    </div>
  );
}
