"use client";
export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div className="flex items-center justify-between p-2 border-b">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id, { completed: !task.completed })}
        />
        <span className={task.completed ? "line-through text-gray-400" : ""}>
          {task.title}
        </span>
      </div>
      <button onClick={() => onDelete(task.id)} className="text-red-500">Delete</button>
    </div>
  );
}
