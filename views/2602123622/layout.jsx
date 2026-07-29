export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <header className="bg-indigo-700 text-white shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Howen Antonio - 2602123622</h1>
          <nav className="space-x-6">
            <a href="/2602123622" className="hover:text-yellow-300 transition font-medium">Home</a>
            <a href="/2602123622/details" className="hover:text-yellow-300 transition font-medium">Details</a>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="bg-gray-200 text-center py-4 text-sm text-gray-600 mt-8">
        &copy; 2026 Computer Science Student
      </footer>
    </div>
  );
}