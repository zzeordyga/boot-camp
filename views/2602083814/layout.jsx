export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-5">
          <h1 className="text-2xl font-bold text-yellow-400">
            Pokédex Explorer
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Discover and explore your favorite Pokémon.
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {children}
      </main>

      <footer className="border-t border-slate-800 text-center py-6 text-sm text-slate-500">
        © 2026 Pokédex Explorer
      </footer>
    </div>
  );
}