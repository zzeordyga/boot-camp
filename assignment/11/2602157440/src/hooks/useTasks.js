'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

const COLLECTION = 'tasks';

function toMillis(value) {
  if (!value) return Date.now();
  if (typeof value.toMillis === 'function') return value.toMillis();
  if (value instanceof Date) return value.getTime();
  return Number(value) || Date.now();
}

/**
 * Data task real-time dari Firestore (onSnapshot) + fungsi CRUD.
 */
export default function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, COLLECTION),
      (snapshot) => {
        const list = snapshot.docs.map((d) => {
          // 'estimate': createdAt sudah terisi walau serverTimestamp belum dikonfirmasi server.
          const data = d.data({ serverTimestamps: 'estimate' });
          return {
            id: d.id,
            title: data.title ?? '',
            completed: Boolean(data.completed),
            createdAt: toMillis(data.createdAt),
          };
        });
        setTasks(list);
        setError(null);
        setLoading(false);
      },
      (err) => {
        console.error('useTasks: onSnapshot error', err);
        setError(err);
        setLoading(false);
      }
    );

    // Berhenti mendengarkan saat komponen unmount.
    return () => unsubscribe();
  }, []);

  const addTask = useCallback(async (title) => {
    const trimmed = title.trim();
    if (!trimmed) return;
    await addDoc(collection(db, COLLECTION), {
      title: trimmed,
      completed: false,
      createdAt: serverTimestamp(),
    });
  }, []);

  const toggleTask = useCallback(async (id, completed) => {
    await updateDoc(doc(db, COLLECTION, id), { completed: !completed });
  }, []);

  const renameTask = useCallback(async (id, title) => {
    const trimmed = title.trim();
    if (!trimmed) return;
    await updateDoc(doc(db, COLLECTION, id), { title: trimmed });
  }, []);

  const deleteTask = useCallback(async (id) => {
    await deleteDoc(doc(db, COLLECTION, id));
  }, []);

  return { tasks, loading, error, addTask, toggleTask, renameTask, deleteTask };
}
