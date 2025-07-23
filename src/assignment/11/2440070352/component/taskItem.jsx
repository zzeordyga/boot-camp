export default function TaskItem({ title, onDelete }) {
  return (
    <div className="flex justify-between items-center p-2 border rounded mb-2">
      <span>{title}</span>
      <button
        onClick={onDelete}
        className="bg-red-500 text-black px-2 py-1 rounded hover:bg-red-700"
      >
        Delete
      </button>
    </div>
  );
}