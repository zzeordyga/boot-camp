'use client'
import React from "react"

class ErrorBoundary extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
        };
    }

    static getDerivedStateFromError(error){
        return{hasError: true, error};
    }

    componentDidCatch(error, errorInfo){
        console.error('Caught by Error Boundary: ',error,errorInfo);
    }

    render() {
  if (this.state.hasError) {
    return (
      <div style={{
        padding: '2rem',
        backgroundColor: '#fff4f4',
        color: '#b30000',
        fontFamily: 'Arial',
        textAlign: 'center',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <h1>🚧 Oops! Something broke.</h1>
        <p style={{ maxWidth: '500px' }}>
          Please Come Back later, we are resolving this case.
          Sorry for the Inconvenience!
        </p>
        <p style={{ fontStyle: 'italic' }}>{this.state.error?.message}</p>
        <button
          onClick={() => location.reload()}
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#b30000',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          🔁 Reload Page
        </button>
      </div>
    );
  }

  return this.props.children;
}

}

export default ErrorBoundary