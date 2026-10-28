"use client";

import React from "react";
import ErrorFallback from "./ErrorFallback";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorFallback
          title="Terjadi kesalahan pada halaman"
          message={this.state.error?.message}
          onRetry={this.handleRetry}
        />
      );
    }
    return this.props.children;
  }
}
