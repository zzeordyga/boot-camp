"use client";

import { useEffect, useState, useCallback } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../lib/firebase";

const TASKS_COLLECTION = "tasks";

/**
 * Subscribes to the `tasks` collection in real time and exposes CRUD helpers.
 * Uses onSnapshot so any change (from this tab, another tab, or another user)
 * is reflected immediately without a manual refetch.
 */
export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const q = query(collection(db, TASKS_COLLECTION), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const nextTasks = snapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            title: data.title,
            completed: data.completed ?? false,
            // Firestore Timestamps need converting to a plain number for sorting/display
            createdAt: data.createdAt?.toMillis?.() ?? Date.now(),
          };
        });
        setTasks(nextTasks);
        setLoading(false);
      },
      (err) => {
        console.error("Failed to subscribe to tasks:", err);
        setError(err.message);
        setLoading(false);
      }
    );

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const addTask = useCallback(async (title) => {
    const trimmed = title.trim();
    if (!trimmed) return;
    await addDoc(collection(db, TASKS_COLLECTION), {
      title: trimmed,
      completed: false,
      createdAt: serverTimestamp(),
    });
  }, []);

  const toggleTask = useCallback(async (id, completed) => {
    await updateDoc(doc(db, TASKS_COLLECTION, id), { completed: !completed });
  }, []);

  const editTask = useCallback(async (id, title) => {
    const trimmed = title.trim();
    if (!trimmed) return;
    await updateDoc(doc(db, TASKS_COLLECTION, id), { title: trimmed });
  }, []);

  const removeTask = useCallback(async (id) => {
    await deleteDoc(doc(db, TASKS_COLLECTION, id));
  }, []);

  return { tasks, loading, error, addTask, toggleTask, editTask, removeTask };
}
