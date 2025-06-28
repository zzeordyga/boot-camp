export default function Layout({ children }) {
    return (
      <div style={{ padding: 20 }}>
        <h1>My Bootcamp Page</h1>
        <main>{children}</main>
      </div>
    );
  }
  