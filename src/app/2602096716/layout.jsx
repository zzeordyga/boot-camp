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

  return <div className="min-h-screen bg-slate-50">{children}</div>;
}