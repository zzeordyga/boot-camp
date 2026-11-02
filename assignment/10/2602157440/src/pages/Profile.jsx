import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, profile, role } = useAuth();

  const created = profile?.createdAt?.toDate
    ? profile.createdAt.toDate()
    : profile?.createdAt instanceof Date
    ? profile.createdAt
    : null;

  return (
    <div className="card">
      <h1>User Profile</h1>
      <p className="muted">Halaman ini hanya bisa diakses user yang sudah login.</p>
      <dl className="details">
        <dt>Nama</dt><dd>{profile?.name || user.displayName || "-"}</dd>
        <dt>Email</dt><dd>{user.email}</dd>
        <dt>UID</dt><dd><code>{user.uid}</code></dd>
        <dt>Role</dt><dd><span className={`badge ${role}`}>{role ?? "-"}</span></dd>
        <dt>Terdaftar</dt><dd>{created ? created.toLocaleString("id-ID") : "-"}</dd>
      </dl>
    </div>
  );
}
