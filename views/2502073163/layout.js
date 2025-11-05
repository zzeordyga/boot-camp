export default function Layout({ children }) {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>My Bootcamp Page</h1>
      <main>{children}</main>
    </div>
  );
}