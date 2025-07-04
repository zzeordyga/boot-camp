import React from 'react';

export default function Layout({ children }) {
  return (
    <div style={{ maxWidth: 800, margin: 'auto', padding: 20 }}>
      <h1 style={{ textAlign: 'center' }}>Welcome to My Page</h1>
      <hr />
      <div>{children}</div>
    </div>
  );
}
