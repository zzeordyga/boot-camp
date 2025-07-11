'use client';

import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Perbarui state agar render berikutnya akan menampilkan UI fallback.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Anda juga bisa me-log error ke layanan pelaporan error
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Anda bisa me-render UI fallback apa pun
      return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Terjadi Kesalahan!</strong>
          <span className="block sm:inline"> Mohon coba muat ulang halaman.</span>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
