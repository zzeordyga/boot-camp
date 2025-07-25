'use client';
import { useEffect, useState } from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from './firebase';
import TaskItem from './components/TaskItem';
import TaskForm from './components/TaskForm';
import { SettingsProvider, useSettings } from './context';
import useLocalStorage from './useLocalStorage';
import { sortTasks } from './helpers';
import useHasMounted from './useHasMounted';
import './styles.css';

export default function Page() {
  return (
    <SettingsProvider>
      <TaskManager />
    </SettingsProvider>
  );
}

function TaskManager() {
  const hasMounted = useHasMounted(); // 👈 wait for client render
  const [tasks, setTasks] = useState([]);
  const [sortOrder, setSortOrder] = useLocalStorage('sortOrder', 'createdAt');
  const { theme, setTheme, language, setLanguage } = useSettings();

  useEffect(() => {
    if (!hasMounted) return;

    const q = query(collection(db, 'tasks'));
    const unsub = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTasks(sortTasks(list, sortOrder));
    });

    return () => unsub();
  }, [sortOrder, hasMounted]);

  if (!hasMounted) return null; // avoid hydration mismatch

  return (
    <main style={{ padding: '24px', maxWidth: '640px', margin: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>Task Manager</h1>
        <button
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          className="theme-toggle"
        >
          Theme: {theme}
        </button>
      </div>

      <div style={{ marginTop: '16px', marginBottom: '16px', display: 'flex', gap: '8px', alignItems: 'center' }}>
        <label htmlFor="sort">Sort by:</label>
        <select
          id="sort"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          style={{ padding: '4px', border: '1px solid #ccc' }}
        >
          <option value="createdAt">Date</option>
          <option value="title">Title</option>
        </select>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{ padding: '4px', border: '1px solid #ccc' }}
        >
          <option value="en">English</option>
          <option value="th">Thai</option>
        </select>
      </div>

      <TaskForm />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {tasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </main>
  );
}