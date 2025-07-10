// app/article/layout.js
'use client';

export default function ArticleLayout({ children }) {
  return (
    <div className="min-h-screen bg-[var(--background-color)] text-[var(--text-color)] pt-10 px-6">
      <div className="max-w-4xl mx-auto">{children}</div>
    </div>
  );
}
