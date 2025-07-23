import { useEffect, useState } from 'react';
import { db } from '../../../../firebase/config'; // pastikan sudah setup Firebase SDK
import { collection, addDoc, deleteDoc, doc, updateDoc, onSnapshot } from 'firebase/firestore';

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const tasksRef = collection(db, 'tugas');

  useEffect(() => {
    const unsubscribe = onSnapshot(tasksRef, (snapshot) => {
      setTasks(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return unsubscribe;
  }, []);

  const addTask = async (task) => await addDoc(tasksRef, task);
  const deleteTask = async (id) => await deleteDoc(doc(tasksRef, id));
  const updateTask = async (id, updatedData) => await updateDoc(doc(tasksRef, id), updatedData);

  return { tasks, addTask, deleteTask, updateTask };
}