import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="card center">
      <h1>404</h1>
      <p className="muted">Halaman tidak ditemukan.</p>
      <Link className="btn" to="/">Home</Link>
    </div>
  );
}
