import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error: error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ errorInfo: errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: "20px",
            border: "1px solid #e0b4b4",
            borderRadius: "8px",
            backgroundColor: "#ffe0e0",
            color: "#a30000",
            textAlign: "center",
            fontFamily: "Arial, sans-serif",
          }}
        >
          <h2 style={{ color: "#a30000" }}>Terjadi Kesalahan! 😬</h2>
          <p>
            Mohon maaf, ada yang tidak beres. Tim kami telah diberitahu dan
            sedang memperbaikinya.
          </p>
          <p>Silakan coba muat ulang halaman ini atau kembali nanti.</p>

          {/* Opsional: Tampilkan detail error hanya di lingkungan pengembangan */}
          {process.env.NODE_ENV === "development" && this.state.error && (
            <details
              style={{
                marginTop: "20px",
                borderTop: "1px dashed #ff9999",
                paddingTop: "15px",
                textAlign: "left",
                fontSize: "0.9em",
                color: "#700000",
              }}
            >
              <summary style={{ cursor: "pointer", fontWeight: "bold" }}>
                Detail Error (Untuk Pengembang)
              </summary>
              <pre
                style={{
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  backgroundColor: "#fff",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ffcccc",
                  marginTop: "10px",
                }}
              >
                {this.state.error.toString()}
                <br />
                {this.state.errorInfo && this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
