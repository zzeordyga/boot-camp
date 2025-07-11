"use client";

export default function FallbackUI() {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center px-4">
            <h1 className="text-3xl font-bold text-red-600 mb-4">Something went wrong</h1>
            <p className="text-gray-600 mb-4">
                We're having trouble loading the page. Please try refreshing, or come back later.
            </p>
            <button
                onClick={() => location.reload()}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
                Refresh Page
            </button>
        </div>
    );
}