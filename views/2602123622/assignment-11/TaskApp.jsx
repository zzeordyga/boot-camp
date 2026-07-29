'use client';

import { useState, useEffect } from 'react';
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from './firebase';
import { t } from './translations';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import { useSettings } from './SettingsContext';
import styles from './styles.module.css';

export default function TaskApp() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const { theme, setTheme, language, setLanguage, sortOrder, setSortOrder } = useSettings();

  useEffect(() => {
    const q = query(collection(db, 'tasks'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setTasks(data);
        setLoading(false);
        setError(null);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleSubmitTask = async (taskData) => {
    try {
      if (taskData.id) {
        await updateDoc(doc(db, 'tasks', taskData.id), {
          title: taskData.title,
          description: taskData.description,
          status: taskData.status,
          priority: taskData.priority,
          updatedAt: serverTimestamp(),
        });
      } else {
        await addDoc(collection(db, 'tasks'), {
          title: taskData.title,
          description: taskData.description,
          status: taskData.status,
          priority: taskData.priority,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }
      setShowForm(false);
      setEditingTask(null);
    } catch (err) {
      console.error('Error saving task:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm(t('confirmDelete', language))) {
      await deleteDoc(doc(db, 'tasks', id));
    }
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    const aTime = a.createdAt?.toMillis?.() || 0;
    const bTime = b.createdAt?.toMillis?.() || 0;
    return sortOrder === 'newest' ? bTime - aTime : aTime - bTime;
  });

  if (loading) {
    return (
      <div className={styles.center}>
        <div className={styles.spinner}></div>
        <p className={styles.loadingText}>{t('loading', language)}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorBox}>
        <h2 className={styles.errorTitle}>{t('error', language)}</h2>
        <p className={styles.errorText}>{error}</p>
        <button onClick={() => window.location.reload()} className={styles.button}>{t('retry', language)}</button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>{t('taskManager', language)}</h1>
        <div className={styles.settings}>
          <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className={styles.themeBtn}>
            {theme === 'light' ? t('themeDark', language) : t('themeLight', language)}
          </button>
          <select value={language} onChange={(e) => setLanguage(e.target.value)} className={styles.langSelect}>
            <option value="en">{t('languageEn', language)}</option>
            <option value="id">{t('languageId', language)}</option>
          </select>
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className={styles.sortSelect}>
            <option value="newest">{t('sortNewest', language)}</option>
            <option value="oldest">{t('sortOldest', language)}</option>
          </select>
        </div>
      </header>

      <div className={styles.toolbar}>
        <button onClick={() => { setEditingTask(null); setShowForm(true); }} className={styles.addBtn}>
          {t('addTask', language)}
        </button>
      </div>

      {showForm && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <TaskForm onClose={() => setShowForm(false)} onSubmit={handleSubmitTask} />
          </div>
        </div>
      )}

      {editingTask && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <TaskForm task={editingTask} onClose={() => setEditingTask(null)} onSubmit={handleSubmitTask} />
          </div>
        </div>
      )}

      <TaskList tasks={sortedTasks} onEdit={setEditingTask} onDelete={handleDelete} />
    </div>
  );
}