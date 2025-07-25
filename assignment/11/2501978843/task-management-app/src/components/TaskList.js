'use client';

import TaskItem from './TaskItem';

export default function TaskList({ tasks, deleteTask, toggleTask }) {
  return (
    <ul style={{ width: '100%', maxWidth: '400px' }}>
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} deleteTask={deleteTask} toggleTask={toggleTask} />
      ))}
    </ul>
  );
}