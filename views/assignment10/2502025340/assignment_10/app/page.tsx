export default function Home() {
  return (
    <div style={{ padding: 40 }}>
      <h1>Welcome</h1>
      <p>Login or Register to continue.</p>

      <a href="/login" style={{ color: "skyblue" }}>Login</a><br />
      <a href="/register" style={{ color: "skyblue" }}>Register</a>
    </div>
  );
}
