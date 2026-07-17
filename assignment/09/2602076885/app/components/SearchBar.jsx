export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="🔍 Search World Cup news..."
      value={value}
      onChange={onChange}
      style={{
        width: "100%",
        padding: "12px 16px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        marginBottom: "25px",
        fontSize: "16px",
      }}
    />
  );
}
