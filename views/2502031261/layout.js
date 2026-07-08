import Link from "next/link";

export const metadata = {
  title: "Tatras Kennosya Destama Tamri - 2502031261",
  description: "React & Next.js integration assignment",
};

export default function NimLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <header className="bg-slate-900 text-white shadow-md">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-lg font-semibold tracking-wide">
            NIM 12345678 — Boot Camp Assignment
          </h1>
          <nav className="flex gap-4 text-sm">
            <Link
              href="/12345678"
              className="hover:text-emerald-400 transition-colors"
            >
              Posts
            </Link>
            <Link
              href="/12345678/details"
              className="hover:text-emerald-400 transition-colors"
            >
              Details
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-8">
        {children}
      </main>

      <footer className="text-center text-xs text-slate-400 py-4 border-t border-slate-200">
        Built with React hooks + Next.js App Router
      </footer>
    </div>
  );
}
