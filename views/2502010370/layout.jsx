export default function Layout({ children }) {
  return (
    <div style={{ padding: '1rem', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>🎮 FreeToGame Showcase</h1>
      <nav style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <a href="/views/2502010370" style={{ marginRight: '1rem' }}>Home</a>
      </nav>
      <main>{children}</main>
    </div>
  );
}
