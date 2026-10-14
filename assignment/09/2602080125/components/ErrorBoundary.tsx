"use client";
import React from "react";

export interface FallbackProps {
    error: Error | null;
    reset: () => void;
}

interface Props {
    FallbackComponent: React.ComponentType<FallbackProps>;
    children: React.ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export default class ErrorBoundary extends React.Component<Props, State> {
    state: State = { hasError: false, error: null };

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        console.error("ErrorBoundary caught:", error, info);
    }

    reset = () => this.setState({ hasError: false, error: null });

    render() {
        if (this.state.hasError) {
            const { FallbackComponent } = this.props;
            return <FallbackComponent error={this.state.error} reset={this.reset} />;
        }
        return this.props.children;
    }
}