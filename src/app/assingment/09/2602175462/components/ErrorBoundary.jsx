"use client";

import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.log("Runtime Error:", error);
    console.log(errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Error pada runtime</h1>
          <p>Tolong refresh halaman</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;