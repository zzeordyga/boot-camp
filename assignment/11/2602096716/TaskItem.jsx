"use client";

export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className="flex items-center justify-between border rounded-lg px-3 py-2">
      <label className="flex items-center gap-2 flex-1">
        <input type="checkbox" checked={task.done} onChange={() => onToggle(task)} />
        <span className={task.done ? "line-through text-gray-400" : ""}>{task.title}</span>
      </label>
      <button onClick={() => onDelete(task.id)} className="text-red-500 text-sm ml-2">✕</button>
    </li>
  );
}