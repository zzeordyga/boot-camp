"use client";

import { Component } from "react";

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(err, info) {
        console.error("ErrorBoundary caught error", err, info);
    }

    render() {
        if (this.state.hasError) {
            return <h2>Something went wrong. Please refresh the page.</h2>;
        }
        return this.props.children;
    }
}