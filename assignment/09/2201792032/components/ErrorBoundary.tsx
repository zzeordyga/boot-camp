'use client';

import React from 'react';

type Props = {
  children: React.ReactNode;
};

type State = {
  hasError: boolean;
};

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
  console.error('Derived error:', error);
  return { hasError: true };
}


  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 text-center text-red-600">
          <h2 className="text-2xl font-bold">😢 Terjadi kesalahan.</h2>
          <p className="mt-2">Silakan coba refresh halaman.</p>
        </div>
      );
    }

    return this.props.children;
  }
}
