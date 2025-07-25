'use client';
import { useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.js';
import { useSettings } from '../context/SettingsContext.js';
import TaskItem from '@/components/TaskItem.jsx';

export default function TaskPage() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(true);
  const { theme, toggleTheme } = useSettings();

  // Listener real-time ke Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'tasks'), (snapshot) => {
      const tasksData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTasks(tasksData.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1)));
      setLoading(false);
    });
    return () => unsubscribe(); // Berhenti listen saat komponen unmount
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    if (newTask.trim() === '') return;
    await addDoc(collection(db, 'tasks'), {
      text: newTask,
      completed: false,
      createdAt: serverTimestamp(),
    });
    setNewTask('');
  };

  return (
    <div className={theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}>
      <div className="container mx-auto p-4 min-h-screen">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Daftar Tugas</h1>
          <button onClick={toggleTheme} className="px-4 py-2 rounded bg-gray-500 text-white">
            Ubah ke Tema {theme === 'light' ? 'Gelap' : 'Terang'}
          </button>
        </header>

        <form onSubmit={addTask} className="flex gap-2 mb-6">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Tambahkan tugas baru..."
            className="flex-grow p-2 rounded border bg-transparent"
          />
          <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded">Tambah</button>
        </form>

        {loading ? <p>Memuat tugas...</p> : (
          <div className="space-y-2">
            {tasks.map(task => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
