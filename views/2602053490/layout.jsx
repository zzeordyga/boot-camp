export default function Layout({ children }) {
  return (
    <div style={{ padding: "30px", fontFamily: "Arial, sans-serif" }}>
      <h2>Student Page — React & Next.js</h2>
      <hr style={{ margin: "20px 0" }} />
      {children}
    </div>
  );
}
