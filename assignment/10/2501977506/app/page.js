import Link from 'next/link';

export default function Home() {
  return (
    <div className="card">
      <h1>Firebase Auth + Next.js</h1>
      <p className="muted">
        Demo of authentication, role-based access control and route protection.
      </p>
      <div className="row">
        <Link className="btn" href="/login">Login</Link>
        <Link className="btn btn-outline" href="/register">Register</Link>
      </div>
    </div>
  );
}
