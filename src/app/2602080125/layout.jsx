import Link from "next/link"

const Layout = ({ children }) => (
    <div className="min-h-screen bg-slate-50 text-slate-900">
        <header className="flex flex-wrap items-center justify-between gap-2 bg-slate-800 px-6 py-4 text-white">
            <h1 className="font-semibold">Joey Liauw Wiharta - 2602080125</h1>
            <nav className="flex gap-4 text-blue-300">
                <Link href="/2602080125">Home</Link>
                <Link href="/2602080125/details">Details</Link>
            </nav>
        </header>
        <main className="mx-auto max-w-5xl p-4">{children}</main>
    </div>
)

export default Layout