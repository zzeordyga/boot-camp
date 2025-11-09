// views/2602124152/layout.js
export const metadata = {
  title: 'Charles Cahyadi — 2602124152',
  description: 'Assignment page with React hooks, API fetch, and nested routes',
}

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="bg-indigo-700 text-white shadow">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-lg sm:text-xl font-semibold">Charles Cahyadi — 2602124152</h1>
          <nav className="flex items-center gap-4 text-sm">
            <a href="/2602124152" className="hover:text-yellow-300 transition-colors">Home</a>
            <a href="/2602124152/details" className="hover:text-yellow-300 transition-colors">Details</a>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>

      <footer className="mt-12 border-t">
        <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-500">
          Built with React + Next.js • Responsive layout with Tailwind CSS
        </div>
      </footer>
    </div>
  )
}
