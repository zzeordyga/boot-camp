"use client";

import React from "react";
import FallbackUI from "./FallbackUI";

// Error Boundaries must be class components — React does not currently
// support catching render errors with hooks.
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // In a real app you might log this to a monitoring service.
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <FallbackUI
          message={
            this.state.error?.message ||
            "A runtime error occurred while rendering this page."
          }
          onRetry={this.handleRetry}
        />
      );
    }

    return this.props.children;
  }
}
