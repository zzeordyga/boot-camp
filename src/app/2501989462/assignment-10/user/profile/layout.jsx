export default function UserLayout({ children }) {
  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h2 style={styles.header}>User Profile</h2>
        {children}
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    backgroundColor: "#f9f9f9",
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
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "600px",
  },
  header: {
    textAlign: "center",
    color: "#444",
    marginBottom: "20px",
  },
};
