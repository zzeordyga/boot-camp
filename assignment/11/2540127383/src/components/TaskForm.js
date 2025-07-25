"use client";
import { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ title, completed: false, createdAt: Date.now() });
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
      <input
        type="text"
        placeholder="Add new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 border rounded p-2"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Add
      </button>
    </form>
  );
}
