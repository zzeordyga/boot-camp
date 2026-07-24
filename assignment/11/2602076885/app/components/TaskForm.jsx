"use client";

import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function TaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter a task title.");
      return;
    }

    try {
      setLoading(true);

      await addDoc(collection(db, "tasks"), {
        title: title.trim(),
        description: description.trim(),
        completed: false,
        createdAt: serverTimestamp(),
      });

      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Failed to add task.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: "white",
        padding: "24px",
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
        marginBottom: "32px",
      }}
    >
      <h2
        style={{
          fontSize: "22px",
          fontWeight: "700",
          color: "#0f172a",
          marginBottom: "20px",
        }}
      >
        Add New Task
      </h2>

      <div style={{ marginBottom: "16px" }}>
        <label
          style={{
            display: "block",
            fontWeight: "600",
            color: "#334155",
            marginBottom: "8px",
          }}
        >
          Task Title
        </label>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "12px 14px",
            border: "1px solid #cbd5e1",
            borderRadius: "8px",
            fontSize: "16px",
            color: "#0f172a",
            backgroundColor: "#ffffff",
          }}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label
          style={{
            display: "block",
            fontWeight: "600",
            color: "#334155",
            marginBottom: "8px",
          }}
        >
          Description
        </label>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description"
          rows={4}
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "12px 14px",
            border: "1px solid #cbd5e1",
            borderRadius: "8px",
            fontSize: "16px",
            resize: "vertical",
            color: "#0f172a",
            backgroundColor: "#ffffff",
          }}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        style={{
          width: "100%",
          padding: "12px",
          border: "none",
          borderRadius: "8px",
          background: loading ? "#94a3b8" : "#2563eb",
          color: "white",
          fontSize: "16px",
          fontWeight: "600",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Adding..." : "Add Task"}
      </button>
    </form>
  );
}
