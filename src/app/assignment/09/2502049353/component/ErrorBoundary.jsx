import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("[App Crash]", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <section style={styles.container}>
          <h2 style={styles.title}>🚧 Halaman Gagal Dimuat</h2>
          <p style={styles.message}>
            Kami menemukan kendala saat memuat halaman ini. Coba lagi nanti.
          </p>

          {process.env.NODE_ENV === "development" && (
            <details style={styles.details}>
              <summary>🔍 Lihat detail kesalahan</summary>
              <pre style={styles.stack}>
                {this.state.error?.toString()}
                {"\n"}
                {this.state.errorInfo?.componentStack}
              </pre>
            </details>
          )}
        </section>
      );
    }

    return this.props.children;
  }
}

const styles = {
  container: {
    backgroundColor: "#f6f8fa",
    border: "1px dashed #999",
    padding: "40px",
    borderRadius: "10px",
    fontFamily: "Verdana, sans-serif",
    textAlign: "center",
    color: "#333",
    maxWidth: "600px",
    margin: "50px auto",
  },
  title: {
    fontSize: "1.6rem",
    marginBottom: "10px",
    color: "#d00000",
  },
  message: {
    fontSize: "1rem",
    color: "#444",
  },
  details: {
    marginTop: "30px",
    textAlign: "left",
    fontSize: "0.9rem",
    background: "#fff",
    border: "1px solid #ddd",
    padding: "15px",
    borderRadius: "6px",
  },
  stack: {
    whiteSpace: "pre-wrap",
    marginTop: "10px",
    color: "#6a040f",
  },
};

export default ErrorBoundary;
