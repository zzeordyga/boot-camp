// app/2440068423/layout.js
export const metadata = {
  title: 'Halaman 2440068423',
  description: 'Halaman tugas Next.js',
};

export default function Layout({ children }) {
  return (
    <div className="bg-white min-h-screen text-gray-800 font-sans">
      <header className="bg-purple-800 text-white shadow">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Homepage Aplikasi</h1>
          <nav className="space-x-4">
            <a href="/2440068423" className="hover:text-yellow-300 transition">Home</a>
            <a href="/2440068423/details" className="hover:text-yellow-300 transition">Details</a>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}

