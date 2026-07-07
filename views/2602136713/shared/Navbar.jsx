'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import "../css/navbar.css";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        Kevin Petersen - 2602136713
      </div>

      <div className="navbar-links">
        <Link
          href="/2602136713"
          className={`nav-link ${pathname === "/2602136713" ? "active" : ""}`}
        >
          Home
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;