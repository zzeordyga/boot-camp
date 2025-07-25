export default function AdminLayout({ children }) {
  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h2 style={styles.header}>Admin Dashboard</h2>
        {children}
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    backgroundColor: "#eef2f7",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  container: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "30px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
    width: "100%",
    maxWidth: "700px",
  },
  header: {
    textAlign: "center",
    color: "#222",
    marginBottom: "20px",
  },
};
