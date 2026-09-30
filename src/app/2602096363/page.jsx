"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";

export default function Page() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "Selesaikan Laporan Softeng",
      completed: false,
      category: "Kuliah",
    },
    {
      id: 2,
      text: "Review Pull Request GitHub",
      completed: true,
      category: "Kerja",
    },
    {
      id: 3,
      text: "Persiapan Presentasi UI/UX",
      completed: false,
      category: "Kuliah",
    },
  ]);
  const [newTaskText, setNewTaskText] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [secondsActive, setSecondsActive] = useState(0);

  const taskInputRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (taskInputRef.current) {
      taskInputRef.current.focus();
    }

    timerRef.current = setInterval(() => {
      setSecondsActive((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    const pendingTasks = tasks.filter((t) => !t.completed).length;
    document.title = `(${pendingTasks}) Task Dashboard - Angeline`;
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    if (filterCategory === "All") return tasks;
    return tasks.filter((task) => task.category === filterCategory);
  }, [tasks, filterCategory]);

  const taskStats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
    return { total, completed, percent };
  }, [tasks]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;

    const newTask = {
      id: Date.now(),
      text: newTaskText,
      completed: false,
      category: "Kuliah",
    };

    setTasks((prev) => [...prev, newTask]);
    setNewTaskText("");
    taskInputRef.current.focus();
  };

  const toggleTaskStatus = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60)
      .toString()
      .padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>William Susanto Lukman</h1>
        <p style={styles.subtitle}>NIM: 2602096363</p>
      </header>

      <section style={styles.bioSection}>
        <p style={styles.bioText}>
          I have graduated with a degree in Computer Science with a
          specialization in Software Engineering. This program focused on
          building a strong foundation in algorithms, data structures, and
          computer systems, while also emphasizing software development
          principles, design patterns, and project management.
        </p>
      </section>

      <div style={styles.statsBar}>
        <div style={styles.statBox}>
          <span style={styles.statLabel}>Durasi Sesi</span>
          <span style={styles.statValue}>{formatTime(secondsActive)}</span>
        </div>
        <div style={styles.statBox}>
          <span style={styles.statLabel}>Total Tugas</span>
          <span style={styles.statValue}>{taskStats.total}</span>
        </div>
        <div style={styles.statBox}>
          <span style={styles.statLabel}>Selesai</span>
          <span style={styles.statValue}>
            {taskStats.completed} ({taskStats.percent}%)
          </span>
        </div>
      </div>

      <form onSubmit={handleAddTask} style={styles.form}>
        <input
          ref={taskInputRef}
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="Tambah tugas baru..."
          style={styles.input}
        />
        <button type="submit" style={styles.addButton}>
          Tambah
        </button>
      </form>

      <div style={styles.filterContainer}>
        {["All", "Kuliah", "Kerja"].map((category) => (
          <button
            key={category}
            onClick={() => setFilterCategory(category)}
            style={{
              ...styles.filterButton,
              backgroundColor:
                filterCategory === category ? "#3182ce" : "#e2e8f0",
              color: filterCategory === category ? "#ffffff" : "#2d3748",
            }}
          >
            {category}
          </button>
        ))}
      </div>

      <ul style={styles.taskList}>
        {filteredTasks.length === 0 ? (
          <li style={styles.emptyState}>Tidak ada tugas dalam kategori ini.</li>
        ) : (
          filteredTasks.map((task) => (
            <li key={task.id} style={styles.taskItem}>
              <div style={styles.taskContent}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskStatus(task.id)}
                  style={styles.checkbox}
                />
                <span
                  style={{
                    ...styles.taskText,
                    textDecoration: task.completed ? "line-through" : "none",
                    color: task.completed ? "#a0aec0" : "#2d3748",
                  }}
                >
                  {task.text}
                </span>
                <span style={styles.badge}>{task.category}</span>
              </div>
              <button
                onClick={() => deleteTask(task.id)}
                style={styles.deleteButton}
              >
                Hapus
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "650px",
    margin: "40px auto",
    padding: "24px",
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow:
      "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    color: "#2d3748",
  },
  header: {
    textAlign: "center",
    marginBottom: "16px",
  },
  title: {
    margin: 0,
    fontSize: "28px",
    color: "#1a202c",
  },
  subtitle: {
    margin: "4px 0 0",
    fontSize: "16px",
    color: "#718096",
    fontWeight: "600",
  },
  bioSection: {
    backgroundColor: "#f7fafc",
    padding: "16px",
    borderRadius: "8px",
    marginBottom: "24px",
    borderLeft: "4px solid #3182ce",
  },
  bioText: {
    margin: 0,
    fontSize: "14px",
    lineHeight: "1.6",
    color: "#4a5568",
  },
  statsBar: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
    gap: "12px",
  },
  statBox: {
    flex: 1,
    backgroundColor: "#edf2f7",
    padding: "12px",
    borderRadius: "8px",
    textAlign: "center",
  },
  statLabel: {
    display: "block",
    fontSize: "12px",
    color: "#718096",
    marginBottom: "4px",
  },
  statValue: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#2b6cb0",
  },
  form: {
    display: "flex",
    gap: "8px",
    marginBottom: "16px",
  },
  input: {
    flex: 1,
    padding: "10px 14px",
    fontSize: "14px",
    borderRadius: "6px",
    border: "1px solid #cbd5e0",
    outline: "none",
  },
  addButton: {
    padding: "10px 20px",
    backgroundColor: "#3182ce",
    color: "#ffffff",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  filterContainer: {
    display: "flex",
    gap: "8px",
    marginBottom: "16px",
  },
  filterButton: {
    padding: "6px 12px",
    borderRadius: "20px",
    border: "none",
    fontSize: "12px",
    cursor: "pointer",
    fontWeight: "600",
  },
  taskList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  taskItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px",
    backgroundColor: "#f7fafc",
    borderRadius: "6px",
    marginBottom: "8px",
    border: "1px solid #e2e8f0",
  },
  taskContent: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  checkbox: {
    width: "16px",
    height: "16px",
    cursor: "pointer",
  },
  taskText: {
    fontSize: "14px",
  },
  badge: {
    fontSize: "10px",
    backgroundColor: "#e2e8f0",
    color: "#4a5568",
    padding: "2px 6px",
    borderRadius: "4px",
  },
  deleteButton: {
    backgroundColor: "#e53e3e",
    color: "#ffffff",
    border: "none",
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "12px",
    cursor: "pointer",
  },
  emptyState: {
    textAlign: "center",
    color: "#a0aec0",
    fontSize: "14px",
    padding: "20px 0",
  },
};
