import { useEffect, useState } from "react";
import { collection, addDoc, deleteDoc, updateDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/firebase";

export function useTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "tasks"), (snapshot) => {
      const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTasks(items);
    });
    return () => unsub();
  }, []);

  const addTask = async (task) => {
    await addDoc(collection(db, "tasks"), task);
  };

  const updateTask = async (id, updates) => {
    await updateDoc(doc(db, "tasks", id), updates);
  };

  const deleteTask = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
  };

  return { tasks, addTask, updateTask, deleteTask };
}
