// hooks/useTasks.js
import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase/config";

export function useTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "tasks"), (snapshot) => {
      setTasks(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const addTask = (task) => addDoc(collection(db, "tasks"), task);
  const updateTask = (id, data) => updateDoc(doc(db, "tasks", id), data);
  const deleteTask = (id) => deleteDoc(doc(db, "tasks", id));

  return { tasks, addTask, updateTask, deleteTask };
}
