import React from 'react';

const Layout = ({ children }) => (
  <div style={{
    minHeight: '100vh',
    background: '#f8fafc',
    padding: '2rem 0'
  }}>
    <header style={{
      textAlign: 'center',
      marginBottom: 32,
      fontWeight: 700,
      fontSize: 24,
      letterSpacing: 1
    }}>
      Bootcamp Assignment - 2501982374
    </header>
    <main>{children}</main>
    <footer style={{
      textAlign: 'center',
      marginTop: 32,
      color: '#888',
      fontSize: 14
    }}>
      &copy; 2025 Sebastian Bintang
    </footer>
  </div>
);

export default Layout;
