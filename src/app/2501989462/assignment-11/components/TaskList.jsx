"use client";
import { useEffect, useState } from "react";
import { listenToTasks, deleteTask, updateTask } from "../utils/helpers";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const unsub = listenToTasks(setTasks);
    return () => unsub();
  }, []);

  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id} style={{ display: "flex", gap: 10 }}>
          <span>{task.title}</span>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
          <button onClick={() => updateTask(task.id, { done: !task.done })}>
            {task.done ? "Undo" : "Done"}
          </button>
        </div>
      ))}
    </div>
  );
}
