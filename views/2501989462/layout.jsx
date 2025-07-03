// views/12345678/layout.jsx
import React from "react";

const Layout = ({ children }) => {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <header style={{ marginBottom: "20px", borderBottom: "1px solid #ccc" }}>
        <h1>Pokémon Explorer</h1>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
