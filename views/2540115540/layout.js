export default function Layout({ children }) {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1>🦆 Duck Gallery</h1>
      {children}
    </div>
  );
}
