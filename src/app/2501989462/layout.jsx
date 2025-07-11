import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import React from "react";

const Layout = ({ children }) => {
  return (
    <ErrorBoundary>
      <div
        style={{
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#f5f7fa",
          minHeight: "100vh",
        }}
      >
        <header
          style={{
            backgroundColor: "#2c3e50",
            borderRadius: "10px",
            color: "#fff",
            padding: "20px",
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          <h1 style={{ margin: 0 }}> Welcome to Pokémon Universe </h1>
        </header>
        <main
          style={{ padding: "0 20px", maxWidth: "1000px", margin: "0 auto" }}
        >
          {children}
        </main>
      </div>
    </ErrorBoundary>
  );
};

export default Layout;
