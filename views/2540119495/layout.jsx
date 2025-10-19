export default function Layout({ children }) {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Welcome to My Page</h1>
      <main>{children}</main>
    </div>
  );
}
