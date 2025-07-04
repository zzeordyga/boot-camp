'use client';

export default function RootLayout({ children }) {
  return (
    <section>
      <header style={{ padding: "1rem", backgroundColor: "#f0f0f0", textAlign: "center", borderBottom: '1px solid #ddd' }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>
          Submission - [2540131696] - [Riezky Rizawardana]
        </h1>
      </header>
      <main style={{ padding: "2rem" }}>
        {children}
      </main>
    </section>
  )
}