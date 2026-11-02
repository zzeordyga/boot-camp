import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div className="card center">
      <h1>403 — Akses ditolak</h1>
      <p className="muted">Kamu sudah login, tapi role kamu tidak punya izin membuka halaman ini.</p>
      <Link className="btn" to="/user/profile">Kembali ke Profile</Link>
    </div>
  );
}
