'use client';

import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Caught by ErrorBoundary:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col justify-center items-center h-[60vh] text-center space-y-4">
          <h2 className="text-2xl font-bold text-[var(--text-color)]">Something went wrong.</h2>
          <button
            onClick={() => location.reload()}
            className="px-4 py-2 bg-[var(--text-color)] text-[var(--primary-color)] rounded hover:bg-[var(--background-color)]"
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
