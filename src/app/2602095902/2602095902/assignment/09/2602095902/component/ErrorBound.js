'use client'

import React from "react";

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getStateFromError(error, errorInfo) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an unhandled runtime error:", error, errorInfo);
    };

    render(){
        if(this.state.hasError){
            return(
                <div className="p-8 max-w-xl mx-auto my-12 bg-red-50 border border-red-200 rounded-xl text-center shadow-sm">
                    <h2 className="text-xl font-bold text-red-700 mb-2">Something went wrong</h2>
                    <p className="text-sm text-red-600 mb-4">
                        The application encountered an unexpected runtime error.
                    </p>
                    <pre className="text-xs bg-red-100 p-3 rounded text-left overflow-x-auto text-red-800 font-mono mb-4">
                        {this.state.error?.toString()}
                    </pre>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 transition-colors"
                    >
                        Reload Page
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}