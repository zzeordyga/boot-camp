"use client";
import { useEffect, useState } from "react";
import { collection, addDoc, doc, updateDoc, deleteDoc, onSnapshot, serverTimestamp } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { useLocalStorage } from "../useLocalStorage";
import { useSettings } from "../SettingsContext";
import { sortTasksByDate } from "../taskUtils";
import TaskItem from "../TaskItem";

const LABELS = {
  id: { title: "Manajemen Tugas", add: "Tambah", placeholder: "Tugas baru...", empty: "Belum ada tugas.", newest: "Terbaru dulu", oldest: "Terlama dulu" },
  en: { title: "Task Manager", add: "Add", placeholder: "New task...", empty: "No tasks yet.", newest: "Newest first", oldest: "Oldest first" },
};

export default function TasksPage() {
  const { theme, setTheme, language, setLanguage } = useSettings();
  const [sortOrder, setSortOrder] = useLocalStorage("2602096716:sortOrder", "newest");
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const t = LABELS[language] || LABELS.id;

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "tasks"),
      (snapshot) => {
        setTasks(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
        setLoading(false);
      },
      (err) => {
        console.error(err);
        setError("Gagal memuat data tugas.");
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const sortedTasks = sortTasksByDate(tasks, sortOrder);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      await addDoc(collection(db, "tasks"), { title: title.trim(), done: false, createdAt: serverTimestamp() });
      setTitle("");
    } catch (err) {
      console.error(err);
      setError("Gagal menambah tugas.");
    }
  };

  const handleToggle = async (task) => {
    try {
      await updateDoc(doc(db, "tasks", task.id), { done: !task.done });
    } catch (err) {
      console.error(err);
      setError("Gagal memperbarui tugas.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "tasks", id));
    } catch (err) {
      console.error(err);
      setError("Gagal menghapus tugas.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 sm:p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
        <h1 className="text-xl sm:text-2xl font-bold">{t.title}</h1>
        <div className="flex gap-2 text-sm">
          <select value={theme} onChange={(e) => setTheme(e.target.value)} className="border rounded px-2 py-1">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
          <select value={language} onChange={(e) => setLanguage(e.target.value)} className="border rounded px-2 py-1">
            <option value="id">ID</option>
            <option value="en">EN</option>
          </select>
        </div>
      </div>

      <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-2">
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder={t.placeholder} className="flex-1 border rounded px-3 py-2" />
        <button type="submit" className="px-4 py-2 bg-indigo-700 text-white rounded">{t.add}</button>
      </form>

      <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="border rounded px-2 py-1 text-sm">
        <option value="newest">{t.newest}</option>
        <option value="oldest">{t.oldest}</option>
      </select>

      {error && <p className="text-red-600 text-sm">{error}</p>}
      {loading ? (
        <p className="text-gray-500 text-sm">Loading...</p>
      ) : sortedTasks.length === 0 ? (
        <p className="text-gray-400 text-sm">{t.empty}</p>
      ) : (
        <ul className="space-y-2">
          {sortedTasks.map((task) => (
            <TaskItem key={task.id} task={task} onToggle={handleToggle} onDelete={handleDelete} />
          ))}
        </ul>
      )}
    </div>
  );
}