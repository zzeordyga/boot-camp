'use client';

import { useMemo, useState } from 'react';
import Header from '@/components/Header';
import TaskForm from '@/components/TaskForm';
import TaskItem from '@/components/TaskItem';
import { useSettings } from '@/context/SettingsContext';
import useLocalStorage from '@/hooks/useLocalStorage';
import useTasks from '@/hooks/useTasks';
import { SORT_ORDERS, sortTasks } from '@/utils/sortTasks';

export default function HomePage() {
  const { t } = useSettings();
  const { tasks, loading, error, addTask, toggleTask, renameTask, deleteTask } = useTasks();
  const [sortOrder, setSortOrder] = useLocalStorage('task-sort-order', 'newest');
  const [actionError, setActionError] = useState(null);

  const sortedTasks = useMemo(() => sortTasks(tasks, sortOrder), [tasks, sortOrder]);
  const doneCount = tasks.filter((task) => task.completed).length;

  // Bungkus aksi CRUD agar error Firestore tampil di UI.
  const run = (fn) => async (...args) => {
    setActionError(null);
    try {
      await fn(...args);
      return true;
    } catch (err) {
      console.error(err);
      setActionError(err);
      return false;
    }
  };

  return (
    <>
      <Header />
      <main className="container">
        <p className="tagline">{t('tagline')}</p>

        <section className="card">
          <TaskForm onAdd={run(addTask)} />

          <div className="toolbar">
            <span className="progress">
              {t('progress', { done: doneCount, total: tasks.length })}
            </span>
            <label className="sort">
              <span>{t('sortBy')}</span>
              <select
                className="select"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                {SORT_ORDERS.map((order) => (
                  <option key={order} value={order}>
                    {t(`sort.${order}`)}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {actionError && (
            <p className="alert" role="alert">
              {t('actionError', { message: actionError.message })}
            </p>
          )}

          {loading ? (
            <p className="state" role="status">{t('loading')}</p>
          ) : error ? (
            <p className="alert" role="alert">
              {t('error', { message: error.message })}
            </p>
          ) : sortedTasks.length === 0 ? (
            <p className="state">{t('empty')}</p>
          ) : (
            <ul className="task-list">
              {sortedTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={run(toggleTask)}
                  onRename={run(renameTask)}
                  onDelete={run(deleteTask)}
                />
              ))}
            </ul>
          )}
        </section>
      </main>
    </>
  );
}
