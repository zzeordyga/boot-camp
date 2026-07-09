"use client";

import { useEffect } from "react";

export default function Layout({ children }) {
  useEffect(() => {
    const scriptSrc = "https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4";
    if (!document.querySelector(`script[src="${scriptSrc}"]`)) {
      const script = document.createElement("script");
      script.src = scriptSrc;
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-gray-800">
      <header className="bg-indigo-800 text-white">
        <div className="max-w-3xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="font-bold">2602096716</h1>
          <nav className="space-x-4 text-sm">
            <a href="/2602096716" className="hover:underline">Home</a>
            <a href="/2602096716/details" className="hover:underline">Details</a>
          </nav>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}