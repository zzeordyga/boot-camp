export default function AuthLayout({ children }) {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Firebase Auth</h1>
        {children}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#e9ecef",
  },
  card: {
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 0 15px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "400px",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
};
