export default function SearchBar({ value, onChange }) {
  return (
    <input
      placeholder="Cari judul..."
      value={value}
      onChange={onChange}
      style={{ marginBottom: "1rem", padding: "0.5rem", width: "100%" }}
    />
  );
}
