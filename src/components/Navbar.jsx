import { NavLink } from "react-router-dom";

function NavButton({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        (isActive
          ? "font-bold text-blue-800 underline"
          : "text-blue-900 hover:text-blue-700") +
        " text-lg px-4 py-2"
      }
    >
      {children}
    </NavLink>
  );
}

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-blue-100 shadow-md border-b border-blue-300 z-50">
      <div className="max-w-5xl mx-auto flex justify-center gap-12 py-4">
        <NavButton to="/">Home</NavButton>
        <NavButton to="/clubs">Clubs</NavButton>
        <NavButton to="/about">About</NavButton>
      </div>
    </nav>
  );
}
