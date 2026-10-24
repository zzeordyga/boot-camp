'use client'
import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from './AuthProvider';

export default function Header() {
  const { status, profile, user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [leaving, setLeaving] = useState(false);

  const links = user
    ? [
        { href: '/user/profile', label: 'Profile' },
        ...(profile?.role === 'admin' ? [{ href: '/admin/dashboard', label: 'Dashboard' }] : []),
      ]
    : [
        { href: '/login', label: 'Log in' },
        { href: '/register', label: 'Register' },
      ];

  const handleLogout = async () => {
    setLeaving(true);
    await logout();
    setLeaving(false);
    router.replace('/login');
  };

  return (
    <header className="header">
      <div className="headerInner">
        <div className="brand">
          <span className="name">Ishvara Pranidhana Lakshmana</span>
          <span className="nim">2602181004 · Computer Science</span>
        </div>
        {status !== 'loading' && (
          <div className="headerActions">
            <nav className="nav">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`navLink ${pathname === link.href ? 'navActive' : ''}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            {user && (
              <div className="account">
                <span className="accountEmail">{user.email}</span>
                {profile && <span className={`roleBadge role-${profile.role}`}>{profile.role}</span>}
                <button className="logout" onClick={handleLogout} disabled={leaving}>
                  {leaving ? 'Logging out…' : 'Log out'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
