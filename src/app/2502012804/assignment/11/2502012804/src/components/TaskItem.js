import React from 'react';
import { deleteTask } from '../lib/firebase';

const TaskItem = ({ task, onEdit }) => {
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(task.id);
      } catch (error) {
        console.error("Error deleting task: ", error);
      }
    }
  };

  return (
    <div className="task-item">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <div className="actions">
        <button onClick={() => onEdit(task)}>Edit</button>
        <button onClick={handleDelete} className="delete">Delete</button>
      </div>
       <style jsx>{`
        .task-item {
          border: 1px solid #ccc;
          padding: 1rem;
          margin-bottom: 1rem;
          border-radius: 8px;
        }
        .actions {
          margin-top: 1rem;
        }
        .delete {
          margin-left: 0.5rem;
          background-color: #e53e3e;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default TaskItem;