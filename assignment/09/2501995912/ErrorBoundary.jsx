'use client'
import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-red-600 text-center mt-10">
          <h2 className="text-xl font-bold">Terjadi kesalahan</h2>
          <p>Silakan muat ulang halaman atau coba lagi nanti.</p>
        </div>
      )
    }

    return this.props.children
  }
}