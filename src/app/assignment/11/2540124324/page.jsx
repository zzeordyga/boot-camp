'use client'
import { useState } from "react";
import { useTasks } from "./hook/useTask";
import { useLocalStorage } from "./hook/useLocalStorage";
import { useUserSettings } from "./context/UserSettingsContext";
import TaskItem from "./components/TaskItem";
import "./main.css";


export default function HomePage() {
  const { tasks, addTask, deleteTask, updateTask } = useTasks();
  const { settings, setSettings } = useUserSettings();
  const [sortOrder, setSortOrder] = useLocalStorage("sortOrder", "asc");
  const [title, setTitle] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [editValue, setEditValue] = useState("");

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    await addTask({ title, createdAt: new Date().toISOString() });
    setTitle("");
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setEditValue(task.title);
  };

  const handleSaveEdit = async () => {
    if (!editValue.trim()) return;
    await updateTask(editingTask.id, { title: editValue });
    setEditingTask(null);
    setEditValue("");
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
    setEditValue("");
  };

  const toggleTheme = () => {
    setSettings({ ...settings, theme: settings.theme === "light" ? "dark" : "light" });
  };

  const handleLanguageChange = (e) => {
    setSettings({ ...settings, language: e.target.value });
  };

  const lang = {
    en: {
      add: "Add",
      placeholder: "Add a task...",
      sort: "Sort by:",
      newest: "Newest to Oldest",
      oldest: "Oldest to Newest",
      edit: "Edit",
      save: "Save",
      cancel: "Cancel",
      delete: "Delete",
      toggle: "Toggle Theme",
      lang: "Language",
    },
    id: {
      add: "Tambah",
      placeholder: "Tambahkan tugas...",
      sort: "Urutkan:",
      newest: "Terbaru ke Terlama",
      oldest: "Terlama ke Terbaru",
      edit: "Ubah",
      save: "Simpan",
      cancel: "Batal",
      delete: "Hapus",
      toggle: "Ubah Tema",
      lang: "Bahasa",
    },
  }[settings.language];

  const sortedTasks = [...tasks].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return sortOrder === "asc" ? dateB - dateA : dateA - dateB;
  });

  return (
    <div className={`container ${settings.theme === "dark" ? "dark" : ""}`}>
      <h1>📋 Task Manager | Manage your Tasks Here</h1>

      {/* Language & Theme Controls */}
      <div className="controls">
        <button onClick={toggleTheme}>{lang.toggle}</button>
        <select value={settings.language} onChange={handleLanguageChange}>
          <option value="en">English</option>
          <option value="id">Bahasa</option>
        </select>
      </div>

      {/* Form Tambah Tugas */}
      <form onSubmit={handleAddTask} className="form">
        <input
          type="text"
          placeholder={lang.placeholder}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input"
        />
        <button type="submit" className="btn">{lang.add}</button>
      </form>

      {/* Sort Dropdown */}
      <div className="sort-section">
        <label htmlFor="sort">{lang.sort}</label>
        <select id="sort" value={sortOrder} onChange={handleSortChange}>
          <option value="asc">{lang.newest}</option>
          <option value="desc">{lang.oldest}</option>
        </select>
      </div>

      {/* Daftar Tugas */}
      <div className="task-list">
        {sortedTasks.map((task) => (
          <div key={task.id} className="task-item">
            {editingTask && editingTask.id === task.id ? (
              <>
                <input
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
                <button onClick={handleSaveEdit}>{lang.save}</button>
                <button onClick={handleCancelEdit}>{lang.cancel}</button>
              </>
            ) : (
              <>
                <TaskItem title={task.title} />
                <div className="task-actions">
                  <button onClick={() => handleEdit(task)}>{lang.edit}</button>
                  <button className="delete-btn" onClick={() => deleteTask(task.id)}>
                    {lang.delete}
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

