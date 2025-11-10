// src/app/2602232371/layout.jsx
'use client'

export default function Layout({ children }) {
  return (
    <div style={{ minHeight: '100vh', background: '#f0fdf4' }}>
      {/* Header */}
      <header style={{ 
        background: 'linear-gradient(90deg, #16a34a 0%, #22c55e 100%)', 
        color: 'white',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '24px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>🎮 Pokemon Explorer</h1>
            <p style={{ fontSize: '14px', opacity: 0.9, margin: '4px 0 0 0' }}>
              Juan Thoriq Pahlevi - 2602232371
            </p>
          </div>
          
          {/* Navigation */}
          <nav style={{ display: 'flex', gap: '16px' }}>
            <a 
              href="/2602232371" 
              style={{ 
                padding: '8px 16px',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                textDecoration: 'none',
                fontWeight: '500',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.3)'}
              onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
            >
              🏠 Home
            </a>
            <a 
              href="/2602232371/details" 
              style={{ 
                padding: '8px 16px',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                textDecoration: 'none',
                fontWeight: '500',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.3)'}
              onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
            >
              ⭐ Details
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 16px' }}>
        {children}
      </main>

      {/* Footer */}
      <footer style={{ 
        background: 'white', 
        color: '#374151', 
        padding: '24px 0',
        marginTop: '48px',
        textAlign: 'center',
        borderTop: '2px solid #d1fae5'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
          <p style={{ fontSize: '14px', margin: 0 }}>
            Created by <span style={{ fontWeight: '600', color: '#16a34a' }}>Juan Thoriq Pahlevi</span> | 
            NIM: 2602232371 | Computer Science - Software Engineering
          </p>
          <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '8px' }}>
            Using React Hooks: useState, useEffect, useRef, useMemo
          </p>
        </div>
      </footer>
    </div>
  );
}
