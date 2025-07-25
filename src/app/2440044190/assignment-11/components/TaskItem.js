"use client";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";

export default function TaskItem({ task }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  const toggleComplete = async () => {
    await updateDoc(doc(db, "tasks", task.id), {
      completed: !task.completed,
    });
  };

  const updateTitle = async () => {
    await updateDoc(doc(db, "tasks", task.id), { title });
    setEditing(false);
  };

  const remove = async () => {
    await deleteDoc(doc(db, "tasks", task.id));
  };

  return (
    <div className="flex items-center justify-between p-2 border rounded">
      <div className="flex items-center gap-2">
        <input type="checkbox" checked={task.completed} onChange={toggleComplete} />
        {editing ? (
          <input value={title} onChange={(e) => setTitle(e.target.value)} onBlur={updateTitle} className="border p-1" />
        ) : (
          <span
            className={`cursor-pointer ${task.completed ? "line-through text-gray-400" : ""}`}
            onClick={() => setEditing(true)}
          >
            {task.title}
          </span>
        )}
      </div>
      <button onClick={remove} className="text-red-500">✕</button>
    </div>
  );
}