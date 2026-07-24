"use client";

import { useState } from "react";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function TaskCard({ task }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [loading, setLoading] = useState(false);

  async function handleUpdate() {
    if (!title.trim()) {
      alert("Task title cannot be empty.");
      return;
    }

    try {
      setLoading(true);

      await updateDoc(doc(db, "tasks", task.id), {
        title: title.trim(),
        description: description.trim(),
      });

      setIsEditing(false);
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Failed to update task.");
    } finally {
      setLoading(false);
    }
  }

  async function handleToggleComplete() {
    try {
      await updateDoc(doc(db, "tasks", task.id), {
        completed: !task.completed,
      });
    } catch (error) {
      console.error("Error updating task status:", error);
      alert("Failed to update task status.");
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteDoc(doc(db, "tasks", task.id));
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task.");
    }
  }

  if (isEditing) {
    return (
      <article
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "14px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
        }}
      >
        <h3
          style={{
            fontSize: "20px",
            fontWeight: "700",
            color: "#0f172a",
            marginBottom: "16px",
          }}
        >
          Edit Task
        </h3>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "12px 14px",
            border: "1px solid #cbd5e1",
            borderRadius: "8px",
            fontSize: "16px",
            marginBottom: "12px",
            color: "#0f172a",
            backgroundColor: "#ffffff",
          }}
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task description"
          rows={4}
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "12px 14px",
            border: "1px solid #cbd5e1",
            borderRadius: "8px",
            fontSize: "16px",
            resize: "vertical",
            marginBottom: "16px",
            color: "#0f172a",
            backgroundColor: "#ffffff",
          }}
        />

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          <button
            onClick={handleUpdate}
            disabled={loading}
            style={{
              padding: "9px 16px",
              border: "none",
              borderRadius: "7px",
              background: "#22c55e",
              color: "white",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>

          <button
            onClick={() => setIsEditing(false)}
            style={{
              padding: "9px 16px",
              border: "none",
              borderRadius: "7px",
              background: "#64748b",
              color: "white",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      </article>
    );
  }

  return (
    <article
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "14px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
        borderLeft: task.completed ? "5px solid #22c55e" : "5px solid #3b82f6",
      }}
    >
      <h3
        style={{
          fontSize: "20px",
          fontWeight: "700",
          color: task.completed ? "#64748b" : "#0f172a",
          textDecoration: task.completed ? "line-through" : "none",
          marginBottom: "8px",
        }}
      >
        {task.title}
      </h3>

      <p
        style={{
          color: "#64748b",
          lineHeight: "1.6",
          marginBottom: "16px",
        }}
      >
        {task.description}
      </p>

      <p
        style={{
          fontSize: "14px",
          fontWeight: "600",
          color: task.completed ? "#16a34a" : "#2563eb",
          marginBottom: "16px",
        }}
      >
        {task.completed ? "✅ Completed" : "⏳ In Progress"}
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        <button
          onClick={handleToggleComplete}
          style={{
            padding: "9px 14px",
            border: "none",
            borderRadius: "7px",
            background: task.completed ? "#f59e0b" : "#22c55e",
            color: "white",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          {task.completed ? "Mark Incomplete" : "Complete"}
        </button>

        <button
          onClick={() => setIsEditing(true)}
          style={{
            padding: "9px 14px",
            border: "none",
            borderRadius: "7px",
            background: "#3b82f6",
            color: "white",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Edit
        </button>

        <button
          onClick={handleDelete}
          style={{
            padding: "9px 14px",
            border: "none",
            borderRadius: "7px",
            background: "#ef4444",
            color: "white",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Delete
        </button>
      </div>
    </article>
  );
}
