// Error Boundary Component
// Catches errors in React components and shows a friendly fallback UI

import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    // State to track if there's an error
    this.state = { hasError: false, error: null };
  }

  // This lifecycle method is called when an error occurs
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  // Log error details (useful for debugging)
  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    // If there's an error, show fallback UI
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '40px',
          textAlign: 'center',
          background: '#fee',
          borderRadius: '12px',
          margin: '20px'
        }}>
          <h2 style={{ color: '#c00', marginBottom: '16px' }}>
            😞 Oops! Something went wrong
          </h2>
          <p style={{ color: '#666', marginBottom: '20px' }}>
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            style={{
              padding: '12px 24px',
              background: '#16a34a',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            🔄 Try Again
          </button>
        </div>
      );
    }

    // If no error, render children normally
    return this.props.children;
  }
}

export default ErrorBoundary;
