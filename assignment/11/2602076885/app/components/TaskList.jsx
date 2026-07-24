"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../lib/firebase";
import TaskCard from "./TaskCard";
import useLocalStorage from "../hooks/useLocalStorage";
import { sortTasks } from "../lib/taskUtils";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortOrder, setSortOrder] = useLocalStorage(
    "task-sort-order",
    "newest",
  );

  useEffect(() => {
    const tasksQuery = query(collection(db, "tasks"));

    const unsubscribe = onSnapshot(
      tasksQuery,
      (snapshot) => {
        const taskData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTasks(taskData);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching tasks:", error);
        setError("Failed to load tasks.");
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const sortedTasks = sortTasks(tasks, sortOrder);

  return (
    <section>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "12px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "700",
            color: "#0f172a",
            margin: 0,
          }}
        >
          My Tasks
        </h2>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          style={{
            padding: "9px 12px",
            border: "1px solid #cbd5e1",
            borderRadius: "8px",
            color: "#0f172a",
            backgroundColor: "#ffffff",
            fontSize: "14px",
            cursor: "pointer",
          }}
        >
          <option value="newest">Newest First</option>

          <option value="oldest">Oldest First</option>
        </select>
      </div>

      {tasks.length === 0 ? (
        <div
          style={{
            background: "white",
            padding: "40px 20px",
            borderRadius: "16px",
            textAlign: "center",
            color: "#64748b",
          }}
        >
          No tasks yet. Add your first task above!
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {sortedTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </section>
  );
}
