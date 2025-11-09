"use client";

import React from "react";

export default function layout({ children }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 text-gray-800 p-6">
            <header className="mb-6">
                <h1 className="text-3xl font-bold text-blue-700">
                    Agnes Fortuna Fu - 2501973306
                </h1>
                <p className="text-gray-600">
                    Program Studio: Computer Science | Interactive Multimedia
                </p>
            </header>

            <main className="bg-white p-6 rounded-2xl shadow-lg">
                {children}
            </main>

            <footer className="mt-6 text-center text-sm text-gray-500">
                © 2025 Agnes Fortuna Fu
            </footer>
        </div>
    );
}