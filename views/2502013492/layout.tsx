import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-100 text-gray-800 font-sans">
            <header className="bg-white shadow-md sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-purple-600">NekosBest API</h1>
                    <nav className="space-x-4 text-sm">
                        <a href="/2502013492" className="hover:underline text-gray-600">
                        Home
                        </a>
                        <a href="/2502013492/details" className="hover:underline text-gray-600">
                        Details
                        </a>
                    </nav>
                </div>
            </header>
            <main className="max-w-2xl mx-auto px-4 py-8">{children}</main>
        </div>
    )
}