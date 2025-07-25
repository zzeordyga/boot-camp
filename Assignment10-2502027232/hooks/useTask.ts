import { useEffect, useState } from 'react';
import { collection, onSnapshot, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export function useTasks() {
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'tasks'), (snapshot) => {
      const newTasks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTasks(newTasks);
    });
    return () => unsub();
  }, []);

  const addTask = (title: string) => addDoc(collection(db, 'tasks'), { title });
  const deleteTask = (id: string) => deleteDoc(doc(db, 'tasks', id));
  const updateTask = (id: string, title: string) => updateDoc(doc(db, 'tasks', id), { title });

  return { tasks, addTask, deleteTask, updateTask };
}
