export default function PostItem({ title, content }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <h2 style={{ fontWeight: "bold" }}>{title}</h2>
      <p>{content}</p>
    </div>
  );
}
