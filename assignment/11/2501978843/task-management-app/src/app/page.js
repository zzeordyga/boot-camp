'use client';

import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useUserSettings } from '../context/UserSettingsContext';
import useLocalStorage from '../hooks/useLocalStorage';
import TaskList from '../components/TaskList';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [sortOrder, setSortOrder] = useLocalStorage('sortOrder', 'asc');
  const { theme, toggleTheme } = useUserSettings();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'tasks'), (snapshot) => {
      const tasksData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTasks(tasksData.sort((a, b) => sortOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)));
    });
    return () => unsubscribe();
  }, [sortOrder]);

  const addTask = async () => {
    if (newTask.trim()) {
      await addDoc(collection(db, 'tasks'), { title: newTask, completed: false });
      setNewTask('');
    }
  };

  const deleteTask = async (id) => {
    await deleteDoc(doc(db, 'tasks', id));
  };

  const toggleTask = async (id, completed) => {
    await updateDoc(doc(db, 'tasks', id), { completed: !completed });
  };

  return (
    <div style={{ background: theme === 'light' ? '#fff' : '#333', color: theme === 'light' ? '#000' : '#fff', minHeight: '100vh', padding: '20px' }}>
      <h1>Task Management App</h1>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
        <option value="asc">A-Z</option>
        <option value="desc">Z-A</option>
      </select>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task"
        style={{ width: '100%', maxWidth: '400px', marginBottom: '10px' }}
      />
      <button onClick={addTask} style={{ width: '100%', maxWidth: '400px', marginBottom: '10px' }}>Add Task</button>
      <TaskList tasks={tasks} deleteTask={deleteTask} toggleTask={toggleTask} />
    </div>
  );
}