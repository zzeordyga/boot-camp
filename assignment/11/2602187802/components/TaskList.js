"use client";

import { useContext, useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";
import { deleteTask, updateTask } from "../lib/tasks";
import { sortTasks } from "../lib/sortTasks";
import { SettingsContext } from "../context/SettingsContext";
import TaskItem from "./TaskItem";

export default function TaskList({ sortOrder }) {
  const { t } = useContext(SettingsContext);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorKey, setErrorKey] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "tasks"),
      (snapshot) => {
        const nextTasks = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));
        setTasks(nextTasks);
        setLoading(false);
        setErrorKey("");
      },
      () => {
        setErrorKey("loadError");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  async function handleToggle(id, completed) {
    setErrorKey("");
    try {
      await updateTask(id, { completed });
    } catch {
      setErrorKey("actionError");
    }
  }

  async function handleEdit(id, title) {
    setErrorKey("");
    try {
      await updateTask(id, { title });
    } catch {
      setErrorKey("actionError");
    }
  }

  async function handleDelete(id) {
    setErrorKey("");
    try {
      await deleteTask(id);
    } catch {
      setErrorKey("actionError");
    }
  }

  if (loading) {
    return <p className="status-message">{t.loading}</p>;
  }

  const sortedTasks = sortTasks(tasks, sortOrder);

  return (
    <section aria-live="polite">
      {errorKey && (
        <p className="error-message" role="alert">
          {t[errorKey]}
        </p>
      )}

      {sortedTasks.length === 0 ? (
        <p className="status-message">{t.emptyState}</p>
      ) : (
        <ul className="task-list">
          {sortedTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={handleToggle}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
