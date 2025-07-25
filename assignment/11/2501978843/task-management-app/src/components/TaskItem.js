'use client';

export default function TaskItem({ task, deleteTask, toggleTask }) {
  return (
    <li style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
      <div>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id, task.completed)}
        />
        {task.title}
      </div>
      <button onClick={() => deleteTask(task.id)}>Delete</button>
    </li>
  );
}