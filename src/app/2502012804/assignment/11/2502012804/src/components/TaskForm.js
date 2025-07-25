import { useState, useEffect } from 'react';
import { addTask, updateTask } from '../lib/firebase';

const TaskForm = ({ taskToEdit, setTaskToEdit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
    } else {
      setTitle('');
      setDescription('');
    }
  }, [taskToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      alert('Title is required');
      return;
    }

    const taskData = { title, description };

    try {
      if (taskToEdit) {
        await updateTask(taskToEdit.id, taskData);
      } else {
        await addTask(taskData);
      }
      setTaskToEdit(null);
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error("Error saving task: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h2>{taskToEdit ? 'Edit Task' : 'Add New Task'}</h2>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">{taskToEdit ? 'Update Task' : 'Add Task'}</button>
      {taskToEdit && (
        <button type="button" onClick={() => setTaskToEdit(null)}>Cancel</button>
      )}
    </form>
  );
};

export default TaskForm;