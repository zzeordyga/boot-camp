import React from 'react';

const Layout = ({ children }) => {
  return (
    <div>
      <header style={{ backgroundColor: '#4CAF50', padding: '10px', color: 'white' }}>
        <h1>Selamat datang {process.env.NEXT_PUBLIC_NIM}</h1>
      </header>
      <main>{children}</main>
      <footer style={{ backgroundColor: '#4CAF50', padding: '10px', color: 'white', textAlign: 'center' }}>
        <p>© 2025. Muhammad Al Haddad.</p>
      </footer>
    </div>
  );
};

export default Layout;
