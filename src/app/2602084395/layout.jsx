import Link from 'next/link'
import './style.css'

export default function Layout({ children }) {
  return (
    <div className="mv-root">
      <header className="mv-header">
        <div className="mv-header-inner">
          <Link href="/2602084395" className="mv-brand">
            Pokédex Malvin
          </Link>
          <span className="mv-owner">Malvin · 2602084395</span>
        </div>
      </header>
      <main className="mv-main">{children}</main>
      <footer className="mv-footer">Data dari PokéAPI · Tugas Bootcamp Next.js</footer>
    </div>
  )
}
