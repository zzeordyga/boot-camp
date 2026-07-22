"use client";

import getDatabase from "@/firebase/config";
import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styles from "./TaskList.module.css";
import { useSearchParams } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";

export default function TaskList({ filterOptions }) {

  const { sortOrder, onlyInProgress } = filterOptions   
  const db = getDatabase();
  const { theme } = useTheme();
  const searchParams = useSearchParams();
  const keyword = searchParams.get("search");
  const [debounceKeyword, setDebounceKeyword] = useState(keyword);
  const [taskData, setTaskData] = useState([]);

  const calculateDueDate = (date) => {
    const now = Date.now();
    const due = new Date(date.toDate());
    const diffMs = due - now;
    const diffDays = diffMs / (1000 * 60 * 60 * 24);

    if (diffMs > 0) {
      return `due in ${Math.floor(diffDays)} day`;
    } else {
      return "already due";
    }
  };

  const handleFinishTask = async (taskId) => {
    const docRef = doc(db, "tasks", taskId);
    await updateDoc(docRef, {
      status: "Completed",
    });
  };

  const handleTerminateTask = async (taskId) => {
    const docRef = doc(db, "tasks", taskId);
    await updateDoc(docRef, {
      status: "Terminated",
    });
  };

  useEffect(() => {
    const q = query(collection(db, "tasks"));
    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        taskId: doc.id,
        ...doc.data(),
      }));
      setTaskData(data);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setDebounceKeyword(keyword);
    }, 500);
    return () => clearTimeout(timeOutId);
  }, [keyword]);

  const visibleTasks = taskData
    .filter(task => {
        if (onlyInProgress && task.status !== "In Progress") {
            return false;
        }

        return task.taskName
            .toLowerCase()
            .includes(debounceKeyword.toLowerCase());
    })
    .sort((a, b) =>
        sortOrder === "asc"
            ? a.dueDate.seconds - b.dueDate.seconds
            : b.dueDate.seconds - a.dueDate.seconds
    );

  return (
    <>
      {visibleTasks.map((task) => {
        return (
          <div
            key={task?.taskId}
            className={`${styles.card} ${styles[theme]} ${styles[task?.status]}`}
          >
            <h1>{task?.taskName}</h1>
            <p>Due Date: {task?.dueDate.toDate().toLocaleString()}</p>
            <p>{`(${calculateDueDate(task?.dueDate)})`}</p>
            <p>Status: {task?.status}</p>
            <div className={`${styles.buttons} ${styles[theme]}`}>
              <button
                className={`${styles["btn-finish"]} ${styles[theme]}`}
                onClick={() => handleFinishTask(task?.taskId)}
                disabled={task?.status !== "In Progress" ? true : false}
              >
                Finish
              </button>
              <button
                className={`${styles["btn-terminate"]} ${styles[theme]}`}
                onClick={() => handleTerminateTask(task?.taskId)}
                disabled={task?.status !== "In Progress" ? true : false}
              >
                Terminate
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}
