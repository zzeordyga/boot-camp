import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
        <header className="bg-indigo-600 text-white shadow-md">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Bootcamp Project</h1>
            <nav>
              <ul className="flex space-x-6">
                <li><a href="/2501995143" className="hover:text-indigo-200 transition">Home</a></li>
                <li><a href="/2501995143/details" className="hover:text-indigo-200 transition">Details</a></li>
              </ul>
            </nav>
          </div>
        </header>
        
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
        
        <footer className="bg-gray-800 text-gray-300 py-6 mt-12">
          <div className="container mx-auto px-4 text-center">
            <p>Created by <span className="font-bold text-white">Raphael Vinzenzio Kent Hartono</span> | Student ID: 2501995143</p>
            <p className="mt-2 text-sm">Data sourced from JSONPlaceholder API</p>
          </div>
        </footer>
      </body>
    </html>
  );
}