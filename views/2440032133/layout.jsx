export default function Layout({ children }) {
  return (
    <html>
      <body className="min-h-screen bg-gray-100 p-6 text-gray-800">
        <header className="mb-6">
          <h1 className="text-2xl font-bold">🎯 Assignment Page</h1>
          <nav className="space-x-4 mt-2">
            <a href="/2440032133" className="text-blue-600 hover:underline">Home</a>
            <a href="/2440032133/details" className="text-blue-600 hover:underline">Details</a>
          </nav>
        </header>
        <main className="bg-white p-4 rounded-lg shadow">{children}</main>
      </body>
    </html>
  );
}
