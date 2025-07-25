"use client";
import { useState } from "react";
import { addTask } from "../utils/helpers";

export default function TaskForm() {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    await addTask({ title, done: false });
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task"
      />
      <button type="submit">Add</button>
    </form>
  );
}
