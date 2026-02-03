

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      backgroundColor: '#f9f9f9',
      minHeight: '100vh',
      padding: '2rem',
    }}>
      <div style={{
        maxWidth: '700px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        padding: '2rem'
      }}>
        <header style={{ marginBottom: '2rem' }}>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#222',
            textAlign: 'center'
          }}>
            Halaman NIM Kamu ✨
          </h1>
        </header>
        {children}
      </div>
    </div>
  )
}
