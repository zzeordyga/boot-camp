"use client";
import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export default function TaskForm() {
  const [title, setTitle] = useState("");

  const addTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    await addDoc(collection(db, "tasks"), {
      title,
      completed: false,
      createdAt: serverTimestamp(),
    });
    setTitle("");
  };

  return (
    <form onSubmit={addTask} className="flex gap-2 mb-4">
      <input
        type="text"
        className="border p-2 flex-grow"
        placeholder="New Task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded">Add</button>
    </form>
  );
}